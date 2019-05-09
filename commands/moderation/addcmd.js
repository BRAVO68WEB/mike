exports.output = async ({message, args}) => {
    const name = args[0]
    const text = args.slice(1).join(' ');

    const guild = await Mike.db.getGuild(message.guild.id)
    const commands = guild.customcmds ? guild.customcmds : []

    const cmd = commands.find(c => c.name === name)
    if (commands.length > 14) return Mike.exec.error(message, "\`You can't have more then 15 command!\nMore custom commands avalible for\` [Donators](https://www.patreon.com/badosz)", false)

    const command = Mike.commands.get(name) || Mike.commands.find(cmd => cmd.data.triggers && cmd.data.triggers.includes(name));
    if(cmd || command) return Mike.exec.error(message, "Command exists!")

    let match = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/i.exec(text);
    if (match && message.guild.members.filter(m => !m.user.bot).size < 300 && !guild.ispremium) return Mike.exec.error(message, "\`Hey! Your text contains link.\nOnly servers with 300+ members (or \`[Premium Servers](https://www.patreon.com/badosz)\`) can have custom commands with link.\n\n\`[[ask \"why\" here]](https://discord.gg/hfGSb8y)" ,false)

    await commands.push({content: text, name:name})
    await Mike.db.update('guilds', message.guild.id, 'customcmds', commands);
    return Mike.exec.snap(message, `Added new command.`)
}
exports.data = {
    triggers: ['addcmd'],
    description: 'Adds custom command for guild.',
    usage: [
        '{prefix}{command} <name> <text>',
        '\n[\`[GUIDE](https://mikebot.xyz/guide)\`]'
    ],
    args: [
        {
            'type':'any',
            'name':'name'
        },
        {
            'type':'any',
            'name':'text'
        }
    ],
    userPerms: [
        "MANAGE_GUILD"
    ]
}
