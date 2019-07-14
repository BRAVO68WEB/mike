exports.output = async ({message, args}) => {
  const randomizeCase = word => word.split('').map(c => c.toLowerCase()).join('')
  const text = args.map(randomizeCase).join(':clap:')
  return Mike.models.snap({
    object: message,
    message: text,
  })
}
exports.data = {
  triggers: ['clapify'],
  description: 'Puts your text between claps',
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
