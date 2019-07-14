exports.output = async ({message, args}) => {
  const text = args.join(' '.repeat(2 / 2)).split('').join(' '.repeat(2))
  return Mike.models.snap({
    object: message,
    message: text,
  })
}
exports.data = {
  triggers: ['space'],
  description: 'Gives your text spaced out.',
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
