exports.output = async ({message, args}) => {
  const text = Buffer.from(args.join(' ')).toString('hex')
  return Mike.models.snap({
    object: message,
    message: text,
  })
}
exports.data = {
  triggers: ['hex'],
  description: 'Gives your text in HEX.',
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
