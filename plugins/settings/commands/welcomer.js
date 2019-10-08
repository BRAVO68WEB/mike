exports.output = async ({message, dbGuild, args}) => {
  
  if (args.length >= 2) {

    if (args[0] == "channel"){
        
      if (args[1] && args[1].startsWith('<#') && args[1].endsWith('>')) {
            
        const id =  args[1].replace(/[<#>]/g, '')
        let channel
        
        if (message.guild.channels.has(id)) {
          channel = message.guild.channels.get(id).id
        } else {
          channel = message.guild.channels.get(args[1]).id
        }
        if (channel) {
          dbGuild.plugins.welcomer.channel = channel
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
    
    } else if (args[0] == "mess") {
      if (args[1]) {
        const mess = args.splice(1).join(" ")
        
        dbGuild.plugins.welcomer.message = mess
        await Mike.db.update('guilds', message.guild.id, "plugins", dbGuild.plugins)
        return Mike.models.snap({
          object: message,
          message: `\`Message updated.\``,
        })
      } else {
        return Mike.models.snap({
          object: message,
          message: '\`Provide valid message.\`',
          color: '#f44262'
        })
      }
    }
  } else if (args[0] == 'enable' || args[0] == 'disable') {
    dbGuild.plugins.welcomer.enabled = (args[0] == 'enable')
    await Mike.db.update('guilds', message.guild.id, "plugins", dbGuild.plugins)
    return Mike.models.snap({
      object: message,
      message: `\`${args[0] == 'enable'? 'Enable' : 'Disable'}d!\``,
    })  
  }
    


  
  Mike.models.snap({
    object: message,
    message: `Welcomer channel: ${dbGuild.plugins.welcomer.channel ? `<#${dbGuild.plugins.welcomer.channel}>` : `\`[not set]\``}
              Enabled: ${dbGuild.plugins.welcomer.enabled ? `\`Yes\`` : `\`No\``}
              Message: ${dbGuild.plugins.welcomer.message ? `\`${dbGuild.plugins.welcomer.message}\`` : `\`[not set]\``}

              To change channel, type:
              \`${Mike.prefix}welcomer channel <#channel>\`

              To enable/disable welcomer, type:
              \`${Mike.prefix}welcomer <enable/disable>\`

              To enable/disable message, type:
              \`${Mike.prefix}welcomer mess <message>\`


              `
  })

}
  
  exports.data = {
    triggers: ['welcomer'],
    description: 'Shows welcomer settings.',
    usage: [
        '{prefix}{command} channel <#channel>',
        '{prefix}{command} <enable/disable>',
        '{prefix}{command} mess <message>',
        '\n[\`[GUIDE](https://mikebot.xyz/tags)\`]'
    ],
    userPerms: [
        "MANAGE_GUILD"
    ]
  }
  