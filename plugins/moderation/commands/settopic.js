exports.output = async ({message, args}) => {
  let channel = message.mentions.channels.first();
  let topic
  if (!channel) {
    channel = message.channel
    topic = args.join(' ')
  }
  else {
    topic = args.slice(1).join(' ').trim()
  }
  await channel.setTopic(topic)
  Mike.models.snap({
    object: message,
    message: `\`Channel topic changed to:\`

              ${topic}
    `,
  })
}
exports.data = {
  triggers: ['settopic'],
  description: 'Changes channel topic.',
  usage: [
    '{prefix}{command} <topic>',
    '{prefix}{command} <#channel> <topic>'
  ],
  args: [
    {
      'type':'any',
      'name':'topic'
    },
  ],
  userPerms: [
    "MANAGE_CHANNELS"
  ],
  botPerms: [
    "MANAGE_CHANNELS"
  ]
}
