exports.output = async ({message, args}) => {
    const text = args.join(' ');
    Mike.exec.snap(message,Buffer.from(text).toString('hex'), false)
}
exports.data = {
    triggers: ['hex'],
    description: 'Gives your text in HEX.',
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
