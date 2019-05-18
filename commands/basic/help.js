const fs = require('fs');
exports.output = async ({message, args, dbGuild}) => {
    let isCommand
    let isCategory

    if (args[0]){
        isCommand = Mike.commands.find(cmd => cmd.data.triggers && cmd.data.triggers.includes(args[0].toLowerCase()))
        isCategory = Mike.categories.includes(args[0])
    }


    if (isCommand){
        isCommand.data = await Object.assign({
            voter: false,
            cooldown: 1,
            usage: ['{prefix}{command}'],
            args: [],
            nsfw: false
        }, isCommand.data)

        const triggers = isCommand.data.triggers.join(', ')
        const description = isCommand.data.description
        const usage = isCommand.data.usage.join('\n').replace(/{prefix}/g, Mike.prefix).replace(/{command}/g, isCommand.data.triggers[0]);
        Mike.exec.snap(message, `**Triggers:**\n\`${triggers}\`\n**Description:**\n\`${description}\`\n**Usage:**\n\`${usage}\``, false)


    } else if (isCategory) {
        if (args[0] == 'nsfw' && !message.channel.nsfw) return Mike.exec.error(message, `This command is available only on nsfw channels.`)
        const commandsFiles = fs.readdirSync(`./commands/${args[0].toLowerCase()}`).filter(file => file.endsWith('.js'));
        let normal =  [];
        let voters = [];
        let votersText

        for (const command of commandsFiles) {
            const curcommand = require(`../${args[0].toLowerCase()}/${command}`);
            if (!curcommand.data.voter) {
                normal.push(curcommand.data.triggers[0])
            } else {
                voters.push(curcommand.data.triggers[0])
            }

        }


        if(!voters || voters.length < 1) {
            votersText = ''
        } else {
            votersText = `\n\n[Voters](https://discordbots.org/bot/419620594645073930/vote) Commands:\n\`${voters.join(', ')}\``
        }

        Mike.exec.snap(message, `Commands:\n\`${normal.join(', ')}\`${votersText}` ,false, null, null, `${Mike.prefix}help <command>`)


    } else {
        let msg = ``
        Mike.categories.forEach(category => {
          msg += `${dbGuild.settings.disabledCategories.includes(category) ? Mike.emoji.markNo : Mike.emoji.markYes}\`${category}\`\n`
        })
        msg += `[[Invite Bot]](https://discordapp.com/oauth2/authorize?client_id=419620594645073930&permissions=8&scope=bot) `,
        msg += `[[Support]](https://discord.gg/hfGSb8y) `,
        msg += `[[Vote]](https://discordbots.org/bot/419620594645073930/vote)\n `
        msg += `[[Website]](https://mikebot.xyz ) `
        msg += `[[Donate]](https://patreon.com/badosz) `
        msg += `[[Guide]](https://mikebot.xyz/guide)`
        Mike.exec.snap(message, msg, false, null, null, `${Mike.prefix}help <category>`)
    }

}
exports.data = {
    triggers: ['help','?'],
    description: 'Shows help about command/category.',
    usage: [
        '{prefix}{command}',
        '{prefix}{command} [category]',
        '{prefix}{command} [command]',
    ]
}
