exports.output = async ({message, args}) => {
  const text = Buffer.from(args.join(' ')).toString('base64')
  return Mike.models.snap({
    object: message,
    message: text,
  })
}
exports.data = {
  triggers: ['base64'],
  description: 'Gives your text in base64.',
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
