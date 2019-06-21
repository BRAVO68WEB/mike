exports.output = async ({message, args}) => {
  const hello = `
**Welcome!**

Bot Invite: https://mikebot.xyz/invite

Server Invite: https://discord.gg/hfGSb8y

Emoji Server: https://discord.gg/hbPAN4E

Github: https://github.com/badosz0

Patreon: https://www.patreon.com/badosz
`

  Mike.models.snap({
    object: message,
    message: hello
  })

  message.delete()
}


exports.data = {
  triggers: ['hello'],
  description: 'Sends hellp message to channel.',
  developer: true,
}
