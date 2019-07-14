exports.output = async ({message, args}) => {
  const text = Mike.utils.array.shuffle(args.join(' ').split('')).join('')
  return Mike.models.snap({
    object: message,
    message: text,
  })
}
exports.data = {
  triggers: ['mix'],
  description: 'Shuffles text.',
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
