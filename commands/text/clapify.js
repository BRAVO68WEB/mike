exports.output = async ({message, args}) => {
    const randomizeCase = word => word.split('').map(c => c.toLowerCase()).join('');
    const text = args.map(randomizeCase).join(':clap:');
    Mike.exec.snap(message, text, false)
}
exports.data = {
    triggers: ['clapify'],
    description: 'Puts your text between claps',
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
