exports.output = async ({message, args}) => {
    Mike.exec.snap(message, `https://lmgtfy.com/?q=${encodeURIComponent(args.join(' '))}`, false)
}

exports.data = {
    triggers: ['lmgtfy'],
    description: 'Gives lmtfy link.',
    usage: [
        '{prefix}{command} <text>',
    ],
    args: [
        {
            'type':'any',
            'name':'text'
        }
    ]
}
