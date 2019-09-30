exports.output = async ({message, args}) => {
  const bannedUsers = await message.guild.fetchBans(true)

  if (!bannedUsers.size) {
    return Mike.models.snap({
      object: message,
      message: '\`No one has been banned in this server.\`',
      color: '#f44262'
    })
  }

  const noOfPages = bannedUsers.size / 10
  let i = (parseInt(args[0]) > 0 && parseInt(args[0]) < noOfPages + 1) ? parseInt(args[0]) : 1
  
  i = i - 1

  let list = []
  for (let user of bannedUsers.values()) {
    list.push(
      `**${user.user.username}#${user.user.discriminator}** - *${user.user.id}*\n\`${user.reason || 'No reason given.'}\`\n`
    )
  }

  list = list.slice(i * 10, (i * 10) + 10)
  
  return Mike.models.snap({
    object: message,
    message: list.join(''),
    footer: `Bans: ${bannedUsers.size} | Page ${i + 1} of ${noOfPages > parseInt(noOfPages) ? parseInt(noOfPages) + 1 : parseInt(noOfPages)}`
  })
  
}

exports.data = {
  triggers: ['banlist','bans'],
  description: 'Lists all the banned users.',
  usage: [
    '{prefix}{command} [page]'
  ],
  userPerms: [
    "BAN_MEMBERS"
  ],
  botPerms: [
    "BAN_MEMBERS"
  ]
}
