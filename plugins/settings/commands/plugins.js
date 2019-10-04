exports.output = async ({message, dbGuild, args}) => {
  if (args.length >= 2) {
    if (args[0] == 'enable') {
      
      const plugin = Mike.plugins.find(plugin => plugin.id == (args[1] ? args[1].toLowerCase() : '*'))

      if (!plugin) {
        return Mike.models.snap({
          object: message,
          message: '\`Plugin doesn\'t exist.\`',
          color: '#f44262'
        })
      }

      if (!dbGuild.settings.disabledPlugins.includes(args[1])) {
        return Mike.models.snap({
          object: message,
          message: '\`Plugin already enabled.\`',
          color: '#f44262'
        })
      }

      for(let i = 0; i < dbGuild.settings.disabledPlugins.length; i++){
        if (dbGuild.settings.disabledPlugins[i] === args[1]) {
          dbGuild.settings.disabledPlugins.splice(i, 1)
        }
      }

      await Mike.db.update('guilds', message.guild.id, "settings", dbGuild.settings)
        
      return Mike.models.snap({
          object: message,
          message: `\`Enabled!\``,
      })
    } else if (args[0] == 'disable') {

      const plugin = Mike.plugins.find(plugin => plugin.id == (args[1] ? args[1].toLowerCase() : '*'))

      if (!plugin) {
        return Mike.models.snap({
          object: message,
          message: '\`Plugin doesn\'t exist.\`',
          color: '#f44262'
        })
      }

      if (dbGuild.settings.disabledPlugins.includes(args[1])) {
        return Mike.models.snap({
          object: message,
          message: '\`Plugin already disabled.\`',
          color: '#f44262'
        })
      }

      if (["settings","dev"].includes(args[1])) {
        return Mike.models.snap({
          object: message,
          message: '\`You can\'t disable this plugin.\`',
          color: '#f44262'
        })
      }

      dbGuild.settings.disabledPlugins.push(args[1])

      await Mike.db.update('guilds', message.guild.id, "settings", dbGuild.settings)
        
      return Mike.models.snap({
          object: message,
          message: `\`Disabled!\``,
      })
    }
  }

  Mike.models.snap({
    object: message,
    message: `Disabled Plugins: \`${dbGuild.settings.disabledPlugins.length ? dbGuild.settings.disabledPlugins.join(', ') : '[none]'}\`

              To change disable/enable plugin, type:
              \`${Mike.prefix}plugins <disable/enable> <id>\`
              `,
  })
}

  
exports.data = {
  triggers: ['plugins'],
  description: 'Shows plugins settings.',
  usage: [
    '{prefix}{command} <disable/enable> <id>'
  ],
  userPerms: [
    "MANAGE_GUILD"
  ]
}