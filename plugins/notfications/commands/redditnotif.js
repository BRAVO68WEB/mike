exports.output = async ({message, dbGuild, args}) => {
  if (args.length >= 2) {
    if (args[0] == "webhook") {
      if (await Mike.utils.regex.webhook(args[1])) {
        dbGuild.plugins.notifications.reddit.webhook = args[1]
        await Mike.db.update('guilds', message.guild.id, "plugins", dbGuild.plugins)
        return Mike.models.snap({
          object: message,
          message: `\`Webhook has been changed to \`[[link]](${args[1]})`,
        })
      } else {
        return Mike.models.snap({
          object: message,
          message: '\`You need to provide valid webhook.\`',
          color: '#f44262'
        })
      }
    } else if (args[0] == "add") {
      if (dbGuild.plugins.notifications.reddit.subs.includes(args[1])) {
        return Mike.models.snap({
          object: message,
          message: '\`This subreddit is already in notifications.\`',
          color: '#f44262'
        })
      }
      if (dbGuild.plugins.notifications.reddit.subs.length >= 3) {
        return Mike.models.snap({
          object: message,
          message: '\`You can\'t have more then 3 subreddits.\`',
          color: '#f44262'
        })
      }
      dbGuild.plugins.notifications.reddit.subs.push(args[1])
      await Mike.db.update('guilds', message.guild.id, "plugins", dbGuild.plugins)
      return Mike.models.snap({
        object: message,
        message: `\`Added new subreddit: ${args[1]}\``,
      })
    } else if (args[0] == "remove") {
      if (!dbGuild.plugins.notifications.reddit.subs.includes(args[1])) {
        return Mike.models.snap({
          object: message,
          message: '\`This subreddit isn\'t in notifications.\`',
          color: '#f44262'
        })
      }
      for(let i = 0; i < dbGuild.plugins.notifications.reddit.subs.length; i++){
       if (dbGuild.plugins.notifications.reddit.subs[i] == args[1]) {
         dbGuild.plugins.notifications.reddit.subs.splice(i, 1)
       }
      }
      await Mike.db.update('guilds', message.guild.id, "plugins", dbGuild.plugins)
      return Mike.models.snap({
        object: message,
        message: `\`Removed subreddit: ${args[1]}\``,
      })
    }
  }

  Mike.models.snap({
    object: message,
    message: `Reddit notifications webhook: ${dbGuild.plugins.notifications.reddit.webhook ? `[[link]](${dbGuild.plugins.notifications.reddit.webhook})` : `\`[not set]\``}
              Subreddits: \`${dbGuild.plugins.notifications.reddit.subs.length > 0 ? dbGuild.plugins.notifications.reddit.subs.join(', ') : '-'}\`

              To change webhook:
              \`${Mike.prefix}redditnotif webhook <webhook url>\`

              To add subreddit:
              \`${Mike.prefix}redditnotif add <subreddit>\`

              To remove subreddit:
              \`${Mike.prefix}redditnotif remove <subreddit>\`
              `,
  })
}

exports.data = {
    triggers: ['redditnotif'],
    description: 'Sends reddit notifications to channel.',
    usage: [
        '{prefix}{command} [webhook] [webhook url]',
        '{prefix}{command} [add] [subreddit]',
        '{prefix}{command} [remove] [subreddit]',
    ],
    userPerms: [
      "MANAGE_GUILD"
    ]
}
