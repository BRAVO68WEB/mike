exports.output = async ({message, args}) => {
    const text = args.join(' ').split('').reverse().join('');
    Mike.exec.snap(message, text, false)
}
exports.data = {
    triggers: ['reverse'],
    description: 'Gives your text but reversed.',
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
