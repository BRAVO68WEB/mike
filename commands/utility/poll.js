exports.output = async ({message, args}) => {
    args = args.join(' ')
    const emojis = ['🇦','🇧','🇨','🇩','🇪','🇫','🇬','🇭','🇮','🇯','🇰','🇱','🇲','🇳','🇴','🇵','🇶','🇷','🇸','🇹','🇺','🇻','🇼','🇽','🇾','🇿']
    const letters =  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
        .map(value => `:regional_indicator_${value}:`)
    if (!args.includes("|")) {
        const poll = await Mike.exec.mult(message,[
            ['Author', `\`${message.author.tag}\``, false],
            ['Content',`\`${args}\``, false]
        ])
        await poll.react('✅')
        await poll.react('❎')
        return
    }
    args = args.split("|")
    let text = ``
    for (i = 0; i < args.length; i++) {
        if (i < 20) {
            text += `${letters[i]}\`${args[i]}\`\n`
        }
    }
    const poll = await Mike.exec.snap(message, text, false)

    for (i = 0; i < args.length; i++) {
        if (i < 20) {
            await poll.react(emojis[i])
        }
    }
}

exports.data = {
    triggers: ['poll','vote'],
    description: 'Creates poll.',
    usage: [
        '{prefix}{command} <text>',
        '{prefix}{command} <option 1>|<option 2>|...',
    ],
    args: [
        {
            'type':'any',
            'name':'text'
        }
    ]
}
