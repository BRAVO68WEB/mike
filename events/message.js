const snek = require('snekfetch');
const fs = require('fs');

module.exports = async (message) => {
    Mike.stats.messages.total += 1
    if (message.author.bot) return

    if (message.mentions.users.first() != null &&
        message.content == message.mentions.users.first() &&
        message.mentions.users.first().id == Mike.user.id) {

        return Mike.exec.snap(message, `My prefix is ${Mike.prefix}`)
    }

    let prefix = Mike.prefix
    const guild = await Mike.db.getGuild(message.guild.id)

    if (guild.settings.codecheck) {
      if (message.content.startsWith('\`\`\`javascript')) return require('../utils/codecheck')(message, 'javascript')
      if (message.content.startsWith('\`\`\`json')) return require('../utils/codecheck')(message, 'json')
      if (message.content.startsWith('\`\`\`js')) return require('../utils/codecheck')(message, 'js')
    }

    if (guild.prefix && message.content.startsWith(guild.prefix)) prefix = guild.prefix
    if (!message.content.startsWith(prefix)) return Mike.db.addXp(message.author.id, message.guild.id, message)
    if (guild.settings.disabledChannels.includes(message.channel.id)) return
    let [call, ...args] = message.content.slice(prefix.length).split(/ +/g)

    command = Mike.commands.find(cmd => cmd.data.triggers && cmd.data.triggers.includes(call.toLowerCase()))
    if(guild.customcmds){
        const cmd = guild.customcmds.find(c => c.name === call)
        if(cmd){
            let cmsg = cmd.content
              .replace(new RegExp("{user.name}", "g"), message.author.username)
              .replace(new RegExp("{server.name}", "g"), message.guild.name)
              .replace(new RegExp("{server.count}", "g"), message.guild.members.filter(m => !m.user.bot).size)
              .replace(new RegExp("{user.mention}", "g"), `<@${message.author.id}>`)
              .replace(new RegExp("{user.tag}", "g"), message.author.discriminator);
            cmsg = await Mike.utils.string.sparse(cmsg)

            return message.channel.send(cmsg)
        }
    }


    if(!command) return

    if (guild.settings.disabledCategories.includes(command.data.category)) return Mike.exec.error(message, 'This command category is disabled in this server.')

    command.data = await Object.assign({
        voter: false,
        voice: false,
        cooldown: 1,
        usage: ['{prefix}{command}'],
        developer: false,
        args: [],
        nsfw: false,
        userPerms: [],
        botPerms: []
    }, command.data)

    // if (Mike.cooldowns.has(`${message.author.id}-${command.data.triggers[0]}`)) {
    //         return Mike.exec.error(message, `You can run this command once every ${command.data.cooldown} ${command.data.cooldown <= 1 ? 'second' : 'seconds'}.`)
    // }
    await Mike.db.update('users',message.author.id,'tag',message.author.tag)
    const dbUser = await Mike.db.getUser(message.author.id)

    let error = ''

    command.data.botPerms.forEach( (perm, i) => {
        if (!message.guild.member(Mike.user).hasPermission(perm)) {
            return error = `Mike needs permission:\n${perm.toTitleCase().replace(`_`,` `)}`
        }
    })

    command.data.userPerms.forEach( (perm, i) => {
        if (!message.member.hasPermission(perm) && message.author.id != `214858075650260992`) {
            return error = `${command.data.triggers[0].charAt(0).toUpperCase() + command.data.triggers[0].slice(1)} command is available only for users with permission:\n${perm.toTitleCase().replace(`_`,` `)}`
        }
    })

    if (command.data.voice == true && !message.member.voiceChannel) return Mike.exec.error(message, `Join voice channel first.`)
    if (command.data.developer == true && !Mike.config.roles.developer.includes(message.author.id)) return Mike.exec.error(message, `This command is only for developers.`)
    if (command.data.args.length > 0 && args.length < command.data.args.length) return Mike.exec.error(message, `Usage:\n\n` + command.data.usage.join('\n').replace(/{prefix}/g, Mike.prefix).replace(/{command}/g, command.data.triggers[0]))
    if (command.data.nsfw && !message.channel.nsfw) return Mike.exec.error(message, `This command is available only on nsfw channels.`)
    if (command.data.voter) {
        r = await snek.get('https://discordbots.org/api/bots/419620594645073930/check?userId=' + message.author.id).set({ Authorization: Mike.config.tokens.dblist })
        if(r.body.voted == 0){
            return Mike.exec.error(message, `\`This command is for \`[[voters]](https://discordbots.org/bot/419620594645073930/vote)\` only!\``, false, null, null, `May take two minutes to update.`)
        }
    }

    command.data.args.forEach( (arg, i) => {
            if (error.length > 0) return
            if (arg.type == 'mentions' && message.mentions.users.map(u => u.username).length < 2) return error = 'Mention at least 2 users.'
            if (arg.type == 'mention' && !message.mentions.members.first()) return error = 'Mention someone.'
            if (arg.type == 'valid-pocket' && isNaN(args[i])) return error = 'Provide valid amount of pocket money.'
            if (arg.type == 'valid-pocket' && args[i] <= 0 ) return error = 'Provide valid amount of pocket money.'
            if (arg.type == 'valid-pocket' && args[i] > dbUser.pocket ) return error = 'You don\'t have so much pocket money.'
            if (arg.type == 'valid-bank' && isNaN(args[0])) return error = 'Provide valid amount of money.'
            if (arg.type == 'valid-bank' && args[i] <= 0 ) return error = 'Provide valid amount of money.'
            if (arg.type == 'valid-bank' && args[i] > dbUser.money ) return error = 'You don\'t have so much money.'
            if (arg.type == 'volume' && isNaN(args[i])) return error = 'Provide valid volume.'
            if (arg.type == 'int' && isNaN(args[i])) return error = 'Provide valid number.'
        }
    )

    if (error.length > 0) return Mike.exec.error(message, error)

    await Mike.db.addCmd(message.author.id)
    command.output({
        command: command,
        message: message,
        args: args,
        dbUser: dbUser,
        dbGuild: guild
    })
    .catch(e => {
        if (e.stack.split('\n')[1].split(':')[(e.stack.split('\n')[1].split(':').length-2)] != undefined) {
            Mike.exec.error(message, `\`Error: ${command.data.triggers[0]}.${e.stack.split('\n')[1].split(':')[(e.stack.split('\n')[1].split(':').length-2)]}\n\`\nReport it please here: https://discord.gg/hfGSb8y`,false);
        } else{
            Mike.exec.error(message, `\`Error! \n\`\nReport it please here: https://discord.gg/hfGSb8y`,false);
        }
      Mike.utils.log.error(e.stack)}
    )
    if (Mike.type != 'beta') {
      Mike.utils.log.command(message)
    }

    Mike.stats.commands.total += 1
    // if (Mike.type != 'beta') {
    //   Mike.dog.metric.send(`mike.commands.${command.data.triggers[0]}`, 1);
    // }

    // Mike.cooldowns.add(`${message.author.id}-${command.data.triggers[0]}`)
    // setTimeout(() => {
    // Mike.cooldowns.delete(`${message.author.id}-${command.data.triggers[0]}`)
    // }, command.data.cooldown * 1000);

}
