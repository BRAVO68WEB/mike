exports.output = async ({message, args}) => {

  Mike.models.snap({
    object: message,
    message: `**Announcement**\n\n${args.join(" ")}`,
    inmessage: '@everyone'
  })

  message.delete()
}


exports.data = {
  triggers: ['ann'],
  description: 'Yeah.',
  developer: true,
}
