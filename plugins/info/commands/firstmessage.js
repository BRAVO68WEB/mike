exports.output = async ({message}) => {
  
  const channel = message.channel
  const messages = await channel.fetchMessages({ after: 1, limit: 1 })
  const msg = messages.first()
  
  Mike.models.snap({
    object: message,
    message: `${msg.content}

              [[link]](${msg.url})`,
    footer: `ID: ${msg.id}`,
    author: [msg.author.tag, msg.author.displayAvatarURL]
  })
  
}

exports.data = {
  triggers: ['firstmessage'],
  description: 'Shows first message in channel.',
  botPerms: [
      "READ_MESSAGE_HISTORY"
  ]
}
