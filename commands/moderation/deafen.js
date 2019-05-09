exports.output = async ({message, args}) => {
    const mention = message.mentions.members.first();
    if (message.author.id !== message.guild.ownerID && message.member.highestRole.comparePositionTo(mention.highestRole) <= 0) return Mike.exec.error(message, 'You need to have higher role!')
    await mention.setDeaf(true);
    return Mike.exec.snap(message,`Done!`)
}

exports.data = {
    triggers: ['deafen'],
    description: 'Deafens user.',
    usage: [
        '{prefix}{command} <mention>'
    ],
    args: [
        {
            'type':'mention',
            'name':'user'
        },
    ],
    userPerms: [
        "DEAFEN_MEMBERS"
    ],
    botPerms: [
        "DEAFEN_MEMBERS"
    ]

}
