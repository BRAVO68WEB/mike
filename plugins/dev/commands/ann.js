exports.output = async ({message, args}) => {
  let text = args.join(" ")

  if (text.includes('--noeveryone')) {
    text = text.replace('--noeveryone', '')
    Mike.models.snap({
      object: message,
      message: `**Announcement**\n\n${text}`
    })

    return message.delete()
  }

  Mike.models.snap({
    object: message,
    message: `**Announcement**\n\n${text}`,
    inmessage: '@everyone'
  })

  message.delete()
}


exports.data = {
  triggers: ['ann'],
  description: 'Yeah.',
  developer: true,
}
