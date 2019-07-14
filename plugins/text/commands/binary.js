exports.output = async ({message, args}) => {
  const text = args.join(' ').split('').map(str => {
    const converted = str.charCodeAt(0).toString(2)
    return converted.padStart(8, '0')
  }).join(' ')

  return Mike.models.snap({
    object: message,
    message: text,
  })
}
exports.data = {
  triggers: ['binary'],
  description: 'Converts text to binary.',
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
