let discord = require("discord.js")
exports.output = async ({ message, args }) => {
    const emote = discord.Util.parseEmoji(args[0])
    if (emote == null) return Mike.models.snap({
        object: message,
        message: '\`Wrong emoji name.\`',
        color: '#f44262'
    })
    if (emote.id == null) return Mike.models.snap({
        object: message,
        message: '\`You can\'t delete this emoji.\`',
        color: '#f44262'
    })
    message.guild.deleteEmoji(emote.id).then(Mike.models.snap({
        object: message,
        message: '\`Emoji deleted.\`',
    }));
}

exports.data = {
    triggers: ['deleteemoji'],
    description: 'Delete emoji by name',
    usage: [
        '{prefix}{command} <name>',
    ],
    args: [
        {
            'type': 'text',
            'name': 'name'
        }
    ],
    userPerms: [
        "MANAGE_EMOJIS"
    ],
    botPerms: [
        "MANAGE_EMOJIS"
    ]
}
