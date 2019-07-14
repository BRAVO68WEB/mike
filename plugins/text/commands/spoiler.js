exports.output = async ({message, args}) => {
  const ftext = args.join(' ')
  let text = ''
  for (var i = 0; i < ftext.length; i++) {
    text += `||${ftext.charAt(i)}||`
  }
  return Mike.models.snap({
    object: message,
    message: text,
  })
}
exports.data = {
  triggers: ['spoiler'],
  description: 'Gives your text but in annoying spoilers.',
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
