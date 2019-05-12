exports.output = async ({message, args}) => {
    const text = args.join(' ');
    Mike.exec.snap(message, Mike.utils.array.shuffle(text.split('')).join(''), false)
}
exports.data = {
    triggers: ['mix'],
    description: 'Shuffles text.',
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
