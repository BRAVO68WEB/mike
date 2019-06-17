exports.output = async ({message, dbGuild, args}) => {
  if (args.length >= 2) {
    if (args[0] == "channel") {
      if (args[1].startsWith('<#') && args[1].endsWith('>')) {
          const id =  args[1].replace(/[<#>]/g, '')
          let channel
          if (message.guild.channels.has(id)) {
            channel = message.guild.channels.get(id).id
          } else {
            channel = message.guild.channels.get(args[2]).id
          }
          if (channel) {
            dbGuild.star.channel = channel
            await Mike.db.update('guilds', message.guild.id, "star", dbGuild.star)
            return Mike.models.snap({
              object: message,
              message: `\`Channel has been changed to \`<#${channel}>`,
            })
          } else {
            return Mike.models.snap({
              object: message,
              message: '\`Channel not found.\`',
              color: '#f44262'
            })
          }
      } else {
        return Mike.models.snap({
          object: message,
          message: '\`You need to mention channel.\`',
          color: '#f44262'
        })
      }
    } else if (args[0] == "stars") {
      if  (/^(1|2|3|4|5|6|7|8|9|10)$/i.test(args[1])) {
          dbGuild.star.number = parseInt(args[1]);
          await Mike.db.update('guilds', message.guild.id, "star", dbGuild.star);
          return Mike.models.snap({
            object: message,
            message: `\`Changed minimum amount of stars to ${args[1]}.\``,
          })
      } else {
          return Mike.models.snap({
            object: message,
            message: '\`Number needs to be 1 - 10.\`',
            color: '#f44262'
          })
      }
    }
  }

  Mike.models.snap({
    object: message,
    message: `Starboard channel: ${dbGuild.star.channel ? `<#${dbGuild.star.channel}>` : `\`[not set]\``}
              Minimum amount of stars: \`${dbGuild.star.number}\`

              To change channel type:
              \`${Mike.prefix}starboard channel <#channel>\`

              To change minimum amount of stars type:
              \`${Mike.prefix}starboard stars <1-10>\`
              `,
  })
}

exports.data = {
    triggers: ['starboard'],
    description: 'Shows starboard settings.',
    usage: [
        '{prefix}{command} [channel] [#channel]',
        '{prefix}{command} [stars] [1-10]',
    ]
}
