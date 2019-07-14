exports.output = async ({message, args}) => {
  const text = args.join(' ').split('').reverse().join('')
  return Mike.models.snap({
    object: message,
    message: text,
  })
}
exports.data = {
  triggers: ['reverse'],
  description: 'Gives your text but reversed.',
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
