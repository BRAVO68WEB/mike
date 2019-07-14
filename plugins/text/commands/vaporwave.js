exports.output = async ({message, args}) => {
  const text = args.join(' ').split('').map(char => {
      const code = char.charCodeAt(0);
      return code >= 33 && code <= 126 ? String.fromCharCode((code - 33) + 65281) : char
  }).join('')
  return Mike.models.snap({
    object: message,
    message: text,
  })
}

exports.data = {
  triggers: ['vaporwave'],
  description: 'Gives your text in weeb style.',
  usage: [
    '{prefix}{command} <text>',
  ],
  args: [
    {
      'type':'text',
      'name':'text'
    }
  ]
}
