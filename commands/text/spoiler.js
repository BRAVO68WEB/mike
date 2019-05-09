exports.output = async ({message, args}) => {
    const ftext = args.join(' ')
    let output = ''
    for (var i = 0; i < ftext.length; i++) {
        output += `||${ftext.charAt(i)}||`;
      }
    Mike.exec.snap(message, output, false)
}
exports.data = {
    triggers: ['spoiler'],
    description: 'Gives your text but in annoying spoilers.',
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
