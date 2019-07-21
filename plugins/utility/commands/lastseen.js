exports.output = async ({message, args}) => {
  const user = await Mike.utils.users.search(message, args[0])
  if (user.lastMessageID) {
    let lastSeen = Date.now() - user.lastMessage.createdTimestamp
    let seconds = lastSeen / 1000
    let days = parseInt(seconds / 86400)
    seconds = seconds % 86400
    let hours = parseInt(seconds / 3600)
    seconds = seconds % 3600
    let minutes = parseInt(seconds / 60)
    seconds = parseInt(seconds % 60)

    lastSeen = `${seconds}s`
    if (days) {
      lastSeen = `${days}d ${hours}h ${minutes}m ${seconds}s`
    }
    else if (hours) {
      lastSeen = `${hours}h ${minutes}m ${seconds}s`
    }
    else if (minutes) {
      lastSeen = `${minutes}m ${seconds}s`
    }

    Mike.models.snap({
      object: message,
      message: `\`${user.tag} was seen ${lastSeen} ago.\``
    })

  }
  else {
    Mike.models.snap({
      object: message,
      message: `\`${user.tag} was not seen for a while.\``,
     })
  }
}
exports.data = {
  triggers: ['lastseen'],
  description: 'Shows the time since the specified user was last seen.',
  usage: [
    '{prefix}{command} [mention]',
    '{prefix}{command} [id]',
    '{prefix}{command} [name]'
  ],
  args: [
    {
        'type':'text',
        'name':'user'
    }
  ]
}
