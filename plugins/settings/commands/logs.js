exports.output = async ({message, dbGuild, args}) => {
    if (args.length >= 2) {

      if (args[0] == "mess"){
        if (args[1] == "channel") {
          if (args[2] && args[2].startsWith('<#') && args[2].endsWith('>')) {
            const id =  args[2].replace(/[<#>]/g, '')
            let channel
            if (message.guild.channels.has(id)) {
              channel = message.guild.channels.get(id).id
            } else {
              channel = message.guild.channels.get(args[2]).id
            }
            if (channel) {
              dbGuild.plugins.logs.messages.channel = channel
              await Mike.db.update('guilds', message.guild.id, "plugins", dbGuild.plugins)
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
        } else if (args[1] == 'enable' || args[1] == 'disable') {
            dbGuild.plugins.logs.messages.enabled = (args[1] == 'enable')
            await Mike.db.update('guilds', message.guild.id, "plugins", dbGuild.plugins)
            return Mike.models.snap({
              object: message,
              message: `\`${args[1] == 'enable'? 'Enable' : 'Disable'}d!\``,
            })
        }  
      } else if (args[0] == "member") {
        if (args[1] == "channel") {
          if (args[2] && args[2].startsWith('<#') && args[2].endsWith('>')) {
            const id =  args[2].replace(/[<#>]/g, '')
            let channel
            if (message.guild.channels.has(id)) {
              channel = message.guild.channels.get(id).id
            } else {
              channel = message.guild.channels.get(args[2]).id
            }
            if (channel) {
              dbGuild.plugins.logs.member.channel = channel
              await Mike.db.update('guilds', message.guild.id, "plugins", dbGuild.plugins)
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
        } else if (args[1] == 'enable' || args[1] == 'disable') {
            dbGuild.plugins.logs.member.enabled = (args[1] == 'enable')
            await Mike.db.update('guilds', message.guild.id, "plugins", dbGuild.plugins)
            return Mike.models.snap({
              object: message,
              message: `\`${args[1] == 'enable'? 'Enable' : 'Disable'}d!\``,
            })
        }  
      }
    
    }


  
    Mike.models.snap({
      object: message,
      message: `Message logs channel: ${dbGuild.plugins.logs.messages.channel ? `<#${dbGuild.plugins.logs.messages.channel}>` : `\`[not set]\``}
                Enabled: ${dbGuild.plugins.logs.messages.enabled ? `\`Yes\`` : `\`No\``}

                Member logs channel: ${dbGuild.plugins.logs.member.channel ? `<#${dbGuild.plugins.logs.member.channel}>` : `\`[not set]\``}
                Enabled: ${dbGuild.plugins.logs.member.enabled ? `\`Yes\`` : `\`No\``}

                To change message logs channel, type:
                \`${Mike.prefix}logs mess channel <#channel>\`
  
                To enable/disable message logs, type:
                \`${Mike.prefix}logs mess <enable/disable>\`

                To change member logs channel, type:
                \`${Mike.prefix}logs member channel <#channel>\`
  
                To enable/disable message logs, type:
                \`${Mike.prefix}logs member <enable/disable>\`
                `
    })
}
  
  exports.data = {
      triggers: ['logs'],
      description: 'Shows logs settings.',
      usage: [
          '{prefix}{command} mess [channel] [#channel]',
          '{prefix}{command} mess [enable/disable]',
      ],
      userPerms: [
          "MANAGE_GUILD"
      ]
  }
  