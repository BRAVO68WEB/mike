exports.output = async ({message, args}) => {
    const text = args.join(' ');
    Mike.exec.snap(message, binary(text), false)

    function binary(text) {
  		return text.split('').map(str => {
  			const converted = str.charCodeAt(0).toString(2);
  			return converted.padStart(8, '0');
  		}).join(' ');
    }
}
exports.data = {
    triggers: ['binary'],
    description: 'Converts text to binary.',
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
