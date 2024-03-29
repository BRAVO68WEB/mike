const events = {
  MESSAGE_REACTION_ADD: 'messageReactionAdd',
  MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
}

module.exports = async (event) => {
  if (!events.hasOwnProperty(event.t)) return
  const { d: data } = event
  const user = Mike.users.get(data.user_id)
  const channel = Mike.channels.get(data.channel_id) || await user.createDM()
  if (channel.messages.has(data.message_id) && events[event.t] == 'messageReactionAdd') return
  const message = await channel.fetchMessage(data.message_id)
  const emojiKey = (data.emoji.id) ? `${data.emoji.name}:${data.emoji.id}` : data.emoji.name
  const reaction = message.reactions.get(emojiKey)
  Mike.emit(events[event.t], reaction, user)
}
