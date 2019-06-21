exports.output = async ({message, args}) => {
  function good(arg, number) {
    if (arg < 1 || arg > 100 || arg == undefined) {
      Mike.models.snap({
        object: message,
        message: `\`${number}. argument should be number between 1 and 100.\``,
        color: '#f44262'
      }).then(msg => { msg.delete(3000) })
      return false
    } else {
      return true
    }
  }

  async function purge() {


    let fetched = await message.channel.fetchMessages({limit: 100})
    let user

    fetched = fetched.array()
    switch (args[0]) {
      case 'all':
        if(!good(args[1], 1)) return
        fetched = fetched.slice(0, args[1])
        break
      case 'bots':
        if(!good(args[1], 1)) return
        fetched = fetched.filter(message => message.author.bot)
        fetched = fetched.slice(0, args[1])
        break
      case 'attachments':
        if(!good(args[1], 1)) return
        fetched = fetched.filter(message => message.attachments.size)
        fetched = fetched.slice(0, args[1])
        break
      case 'links':
        if(!good(args[1], 1)) return
        fetched = fetched.filter(async message => await Mike.utils.regex.link(message.content))
        fetched = fetched.slice(0, args[1])
        break
      case 'embeds':
        if(!good(args[1], 1)) return
        fetched = fetched.filter(message => message.embeds.length != 0)
        fetched = fetched.slice(0, args[1])
        break
      case 'user':
        if (message.mentions.users.size) {
          user = message.mentions.users.first();
        }
        if (user) {
          fetched = fetched.filter(message => message.author.id === user.id)
        } else {
          return Mike.models.snap({
            object: message,
            message: `\`2. argument should be a mention.\``,
            color: '#f44262'
          }).then(msg => { msg.delete(3000) })
        }
        if(!good(args[2], 2)) return
        fetched = fetched.slice(0, args[2])
        break
      case 'after':
        if (!message.channel.messages.get(args[1])) {
          return Mike.models.snap({
            object: message,
            message: `\`Message with this id was not found.\``,
            color: '#f44262'
          }).then(msg => { msg.delete(3000) })
        }
        fetched = fetched.filter(message => message.id > parseInt(args[1]))
        fetched = fetched.slice(0, args[1])
        break
      case 'before':
        if (!message.channel.messages.get(args[1])) {
          return Mike.models.snap({
            object: message,
            message: `\`Message with this id was not found.\``,
            color: '#f44262'
          }).then(msg => { msg.delete(3000) })
        }
        fetched = fetched.filter(message => message.id < parseInt(args[1]))
        fetched = fetched.slice(0, args[1])
        break
      case 'with':
        if(!good(args[2], 2)) return
        if(!args[1]) args[1] = " "
        console.log(args[1])
        fetched = fetched.filter(message => message.content.includes(args[1]))
        fetched = fetched.slice(0, args[2])
        break
      case 'without':
        if(!good(args[2], 2)) return
        if(!args[1]) args[1] = " "
        console.log(args[1])
        fetched = fetched.filter(message => !message.content.includes(args[1]))
        fetched = fetched.slice(0, args[2])
        break
      default:
        return Mike.models.snap({
          object: message,
          message: `\`Type "${Mike.prefix}help clear" for usage.\``,
          color: '#f44262'
        }).then(msg => { msg.delete(5000) })
      }

      await message.channel.bulkDelete(fetched)

      let deleted = {}
      let cleared = ``

      fetched.forEach(message => {
        if (!deleted[message.author.tag]) deleted[message.author.tag] = []
        deleted[message.author.tag].push(message.id)
      })

      Object.keys(deleted).forEach(user => {
        cleared += `\`${deleted[user].length}\` message${deleted[user].length == 1 ? `` : `s`} by ${user}\n`
      })

      return Mike.models.snap({
        object: message,
        message: `**${message.author.tag}** has deleted \`${fetched.length}\` message${fetched.length == 1 ? `` : `s`}!

                  ${cleared}
        `,
      })
  }
  return message.delete().then(() => { purge() })
}
exports.data = {
  triggers: ['clear','prune', 'purge'],
  description: 'Clear messages.',
  usage: [
    '{prefix}{command} all <number of messages>',
    '{prefix}{command} embeds <number of messages>',
    '{prefix}{command} attachments <number of messages>',
    '{prefix}{command} links <number of messages>',
    '{prefix}{command} bots <number of messages>',
    '{prefix}{command} user <mention> <number of messages>',
    '{prefix}{command} before <message id>',
    '{prefix}{command} after <message id>',
    '{prefix}{command} with <word> <number of messages>',
    '{prefix}{command} without <word> <number of messages>'
  ],
  args: [
    {
      'type':'text',
      'name':'type'
    },
  ],
  userPerms: [
    "MANAGE_MESSAGES"
  ],
  botPerms: [
    "MANAGE_MESSAGES"
  ]
}
