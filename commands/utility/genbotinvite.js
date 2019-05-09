exports.output = async ({message, args}) => {
    const mention = message.mentions.members.first();
    let id
    if (mention) {
        id = mention.id
    } else {
        const match = /^([0-9]{15,21})$/i.exec(args[0]);
        if(!match) return Mike.exec.error(message, 'It\' not a valid ID!')
        id = args[0]
    }
    return Mike.exec.snap(message,
        `[[Necessary Perms]](https://discordapp.com/oauth2/authorize?client_id=${id}&scope=bot&permissions=18432)\n` +
        `[[Minimal Perms]](https://discordapp.com/oauth2/authorize?client_id=${id}&scope=bot&permissions=1026927702)\n` +
        `[[Maximal Perms]](https://discordapp.com/oauth2/authorize?client_id=${id}&scope=bot&permissions=8)`, false)
}

exports.data = {
    triggers: ['genbotinvite'],
    description: 'Generates bot invite link.',
    usage: [
        '{prefix}{command} <id>',
        '{prefix}{command} <mention>'
    ],
    args: [
        {
            type:'any',
            name:'bot'
        }
    ]
}
