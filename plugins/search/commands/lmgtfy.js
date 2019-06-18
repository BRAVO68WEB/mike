exports.output = async ({message, args}) => {
  Mike.models.snap({
    object: message,
    message: `https://lmgtfy.com/?q=${encodeURIComponent(args.join(' '))}`,
  })
}

exports.data = {
  triggers: ['lmgtfy'],
  description: 'Creates lmgtfy link.',
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
