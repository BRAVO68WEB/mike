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
        console.log(stored.guild)
        const table = new AsciiTable(stored.guild.id)
          .addRow('Owner', stored.guild.ownerID)
          .addRow('Name', stored.guild.name)
          .addRow('Region', stored.guild.region)
          .addRow('Joined at', await stored.guild.members.get(Mike.user.id).joinedAt.toUTCString())
          .addRow('Premium Server', stored.db.ispremium ? 'yes' : 'no')
          .addRow('Custom Prefix', stored.db.prefix ? stored.db.prefix : '[not set]')
          .addRow('Disabled Plugins', stored.db.settings.disabledPlugins.length > 0 ? stored.db.settings.disabledPlugins.join('\n') : '-')
        message.channel.send(`\`\`\`css\n${table.toString()}\n\`\`\``)
      }
      if (tokens[i] == 'delete') {
        await Mike.db.deleteGuild(tokens[i])
      }
    }
  }
}
