exports.output = async ({message, args}) => {
  const [type, ...text] = args
  let decoded
  switch (type) {
    case 'base64':
      decoded = Buffer.from(text.join(' '), 'base64').toString()
      break
    case 'hex':
      decoded = Buffer.from(text.join(' '), 'hex').toString('utf8')
      break
    default:
      return Mike.models.snap({
        object: message,
        message: '\`You need to provide valid decryption type!\`',
        color: '#f44262'
      })
  }
  return Mike.models.snap({
    object: message,
    message: decoded
  })
}
exports.data = {
  triggers: ['decode'],
  description: 'Decodes your text.',
  usage: [
    '{prefix}{command} base64 <text>',
    '{prefix}{command} hex <text>'
  ],
  args: [
    {
      'type':'text',
      'name':'type'
    },
    {
      'type':'text',
      'name':'text'
    },
  ]
}
