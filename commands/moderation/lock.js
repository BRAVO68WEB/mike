exports.output = async ({message, args}) => {
    if (args[0] == '--remove') {
        await message.channel.overwritePermissions(message.guild.id, {
            SEND_MESSAGES: null,
            ADD_REACTIONS: null
        });
        return Mike.exec.snap(message, `:unlock:\`Channel unlocked.\``, false)

    }
    Mike.exec.snap(message, `:lock:\`Channel locked.\``, false)
    return await message.channel.overwritePermissions(message.guild.id, {
     SEND_MESSAGES: false,
     ADD_REACTIONS: false
    });

}
exports.data = {
    triggers: ['lock','lockdown'],
    description: 'Locks down channel.',
    usage: [
        '{prefix}{command}',
        '{prefix}{command} --remove'
    ],
    userPerms: [
        "MANAGE_GUILD"
    ],
    botPerms: [
        "MANAGE_ROLES",
        "MANAGE_CHANNELS"
    ]

}
