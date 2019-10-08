exports.output = async ({message, args}) => {
  let text = args.slice(1).join(" ")

  if (text.includes('--noeveryone')) {
    text = text.replace('--noeveryone', '')
    Mike.models.snap({
      object: message,
      message: `**Update** - ${args[0]}\n\n${text}`
    })

    return message.delete()
  }

  Mike.models.snap({
    object: message,
    message: `**Update** - ${args[0]}\n\n${text}`,
    inmessage: '@everyone'
  })

  message.delete()
}


exports.data = {
  triggers: ['update'],
  description: 'Yeah.',
  developer: true,
}
