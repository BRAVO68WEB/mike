exports.output = async ({ message, args }) => {
    var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    if (!regex.test(args[1])) return Mike.models.snap({
        object: message,
        message: '\`Enter valid URL.\`',
        color: '#f44262'
    })
    if (message.guild.emojis.filter(x => x.name == args[0]).size == 1) return Mike.models.snap({
        object: message,
        message: '\`Emoji already exist.\`',
        color: '#f44262'
    })
    if (args[1].match(/\.(jpeg|jpg|gif|png)$/) != null){
        message.guild.createEmoji(args[1], args[0]).then(async emoji=>{
            return Mike.models.snap({
                object: message,
                message: '\`Emoji created.\`',
            })
        })
    }
    else {
        return Mike.models.snap({
            object: message,
            message: '\`Wrong Link.\`',
            color: '#f44262'
        })
    }
}

exports.data = {
    triggers: ['createemoji'],
    description: 'Create emoji from link',
    usage: [
        '{prefix}{command} <name> <link to image>',
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
