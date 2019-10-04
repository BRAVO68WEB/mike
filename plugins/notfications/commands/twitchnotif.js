exports.output = async ({message, dbGuild, args}) => {
  if (args.length >= 2) {
    if (args[0] == "webhook") {
      if (await Mike.utils.regex.webhook(args[1])) {
        dbGuild.plugins.notifications.twitch.webhook = args[1]
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
      if (dbGuild.plugins.notifications.twitch.streamers.includes(args[1])) {
        return Mike.models.snap({
          object: message,
          message: '\`This streamer is already in notifications.\`',
          color: '#f44262'
        })
      }
      if (dbGuild.plugins.notifications.twitch.streamers.length >= 3) {
        return Mike.models.snap({
          object: message,
          message: '\`You can\'t have more then 3 streamers.\`',
          color: '#f44262'
        })
      }
      try {
        const check = await Mike.http.get(`https://api.twitch.tv/kraken/channels/${args[1]}`)
                                     .set({
                                       'Client-ID': Mike.tokens.twitch,
                                       'Accept':'Accept: application/vnd.twitchtv.v3+json'
                                     })
      } catch(e) {
        return Mike.models.snap({
          object: message,
          message: '\`Streamer doesn\'t exist.\`',
          color: '#f44262'
        })
      }
      dbGuild.plugins.notifications.twitch.streamers.push(args[1])
      await Mike.db.update('guilds', message.guild.id, "plugins", dbGuild.plugins)
      return Mike.models.snap({
        object: message,
        message: `\`Added new streamer: ${args[1]}\``,
      })
    } else if (args[0] == "remove") {
      if (!dbGuild.plugins.notifications.twitch.streamers.includes(args[1])) {
        return Mike.models.snap({
          object: message,
          message: '\`This streamer isn\'t in notifications.\`',
          color: '#f44262'
        })
      }
      for(let i = 0; i < dbGuild.plugins.notifications.twitch.streamers.length; i++){
       if (dbGuild.plugins.notifications.twitch.streamers[i] == args[1]) {
         dbGuild.plugins.notifications.twitch.streamers.splice(i, 1)
       }
      }
      await Mike.db.update('guilds', message.guild.id, "plugins", dbGuild.plugins)
      return Mike.models.snap({
        object: message,
        message: `\`Removed streamer: ${args[1]}\``,
      })
    }
  } else if (args[0] == 'enable' || args[0] == 'disable') {
      dbGuild.plugins.notifications.twitch.enabled = (args[0] == 'enable')
    await Mike.db.update('guilds', message.guild.id, "plugins", dbGuild.plugins)
    return Mike.models.snap({
      object: message,
      message: `\`${args[0] == 'enable'? 'Enable' : 'Disable'}d!\``,
    })
  }

  Mike.models.snap({
    object: message,
    message: `Twitch notifications webhook: ${dbGuild.plugins.notifications.twitch.webhook ? `[[link]](${dbGuild.plugins.notifications.twitch.webhook})` : `\`[not set]\``}
              Streamers: \`${dbGuild.plugins.notifications.twitch.streamers.length > 0 ? dbGuild.plugins.notifications.twitch.streamers.join(', ') : '-'}\`
              Enabled: ${dbGuild.plugins.notifications.twitch.enabled ? `\`Yes\`` : `\`No\``}

              To change webhook:
              \`${Mike.prefix}twitchnotif webhook <webhook url>\`

              To add streamer:
              \`${Mike.prefix}twitchnotif add <streamer>\`

              To remove streamer:
              \`${Mike.prefix}twitchnotif remove <streamer>\`

              To enable notifications:
              \`${Mike.prefix}twitchnotif enable\`

              To disable notifications:
              \`${Mike.prefix}twitchnotif disable\`
              `,
  })
}

exports.data = {
    triggers: ['twitchnotif'],
    description: 'Sends twitch notifications to channel.',
    usage: [
        '{prefix}{command} [webhook] [webhook url]',
        '{prefix}{command} [add] [streamer]',
        '{prefix}{command} [remove] [streamer]',
    ],
    userPerms: [
      "MANAGE_GUILD"
    ],
    donator: true
}
