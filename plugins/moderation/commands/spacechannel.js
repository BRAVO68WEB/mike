exports.output = async ({message}) => {
    let Channel = message.mentions.channels.first();
    Channel.setName(Channel.name.replace(/-/g, ' '))
    Mike.models.snap({
      object: message,
      message: `${Mike.customEmojis.markYes} Done`
    })
}
exports.data = {
  triggers: ['spacechannel'],
  description: 'Deletes - from channel\'s name',
  usage: [
      '{prefix}{command} [#channel]',
  ],
  userPerms: [
    "MANAGE_CHANNELS"
  ],
  botPerms: [
    "MANAGE_CHANNELS"
  ]

}
