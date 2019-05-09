exports.output = async ({message, args}) => {
    const text = args.join(' '.repeat(2 / 2)).split('').join(' '.repeat(2))
    Mike.exec.snap(message, text, false)
}
exports.data = {
    triggers: ['space'],
    description: 'Gives your text spaced out.',
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
