const AsciiTable = require('ascii-table')

module.exports = async (message) => {
  const tokens = message.content.split(' ')
  let stored = {}
  let table
  for (let i = 1; i < tokens.length; i++) {

    if (tokens[i] == 'guild') {
      i++
      stored.guild = await Mike.guilds.get(tokens[i])
      stored.db = await Mike.db.getGuild(stored.guild.id)
      i++
      if (tokens[i] == 'print') {
        const table = new AsciiTable(stored.guild.id)
          .addRow('Owner', stored.guild.ownerID)
          .addRow('Name', stored.guild.name)
          .addRow('Region', stored.guild.region)
          .addRow('Joined at', await stored.guild.members.get(Mike.user.id).joinedAt.toUTCString())
          .addRow('Premium Server', stored.db.ispremium ? 'Yes' : 'No')
          .addRow('Custom Prefix', stored.db.prefix ? stored.db.prefix : '[not set]')
          .addRow('Disabled Plugins', stored.db.settings.disabledPlugins.length > 0 ? stored.db.settings.disabledPlugins.join('\n') : '-')
          .addRow('Members', stored.guild.members.filter(m => !m.user.bot).size.toString())
          .addRow('Bots', stored.guild.members.filter(m => m.user.bot).size.toString())
          .addRow('Bot Farm', Math.round(stored.guild.members.filter(m => m.user.bot).size/stored.guild.members.size*100).toString() + "%")
        message.channel.send(`\`\`\`css\n${table.toString()}\n\`\`\``)
      }
      if (tokens[i] == 'delete') {
        await Mike.db.deleteGuild(stored.guild.id)
      }
    }
    if(tokens[i] == 'user')
    {
      i++
      stored.user = await Mike.users.get(tokens[i])
      i++
      if(tokens[i] == 'print') {
        const table = new AsciiTable(stored.user.id)
          .addRow('Name', stored.user.tag)
          .addRow('Bot', stored.user.bot ? 'Yes' : 'No')
          .addRow('Created At', stored.user.createdAt.toUTCString())
          .addRow('Status', stored.user.presence.status.replace(/online/g, `Online`).replace(/idle/g, `Idle`).replace(/dnd/g, `Dnd`).replace(/offline/g, `Offline`))
          .addRow("In", stored.user.presence.game ? `${stored.user.presence.game.name}` : "Nothing")
        message.channel.send(`\`\`\`css\n${table.toString()}\n\`\`\``)
    }
  }
}
}
