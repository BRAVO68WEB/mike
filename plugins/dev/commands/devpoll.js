exports.output = async ({message, args}) => {
  let text = args.join(" ")
  let image
  if (message.attachments.size) {
    if (message.attachments.first().height) {
      image = message.attachments.first().url
    }
  }
  if (text.includes('--nohere')) {
    text = text.replace('--nohere', '')
    const poll = await Mike.models.snap({
      object: message,
      message: `**Poll**\n\n${text}`,
      image: image
    })
    await poll.react(Mike.customEmojis.markYesID)
    await poll.react(Mike.customEmojis.markNoID)
    return message.delete()
  }

  const poll = await Mike.models.snap({
    object: message,
    message: `**Poll**\n\n${text}`,
    inmessage: '@here',
    image: image
  })
  await poll.react(Mike.customEmojis.markYesID)
  await poll.react(Mike.customEmojis.markNoID)

  message.delete()
}


exports.data = {
  triggers: ['devpoll'],
  description: 'Yeah.',
  developer: true,
}
