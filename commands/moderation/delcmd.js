exports.output = async ({message, args}) => {
    const name = args[0]
    const guild = await Mike.db.getGuild(message.guild.id)

    let commands = guild.customcmds ? guild.customcmds : []
    const cmd = commands.find(c => c.name === name)

    if(!cmd) return Mike.exec.error(message, "Command doesn't exists.")
    commands = commands.filter(function( obj ) {
        return obj.name !== name;
    });
    await Mike.db.update('guilds', message.guild.id, 'customcmds', commands);
    return Mike.exec.snap(message,`Removed command!`)
}
exports.data = {
    triggers: ['delcmd'],
    description: 'Deletes custom command for guild.',
    usage: [
        '{prefix}{command} <cmd>'
    ],
    args: [
        {
            'type':'any',
            'name':'command'
        },
    ],
    userPerms: [
        "MANAGE_GUILD"
    ]
}
