const Discord = require('discord.js')

exports.output = async ({message, args}) => {
  const guild = await Mike.db.getGuild(message.guild.id)
  suggestionChannel = message.guild.channels.filter(channel => channel.type === 'text').get(guild.settings.suggestions.channel);
  if (!suggestionChannel) {
    return Mike.exec.error(message, "Suggestion channel not found.")
  }
  message.channel = suggestionChannel
  const oldMsg = await suggestionChannel.fetchMessage(args[0]);
  if (!oldMsg) {
    return Mike.exec.error(message, "Suggestion not found.")
  }
  const embed = new Discord.RichEmbed()
      .setFooter(oldMsg.embeds[0].footer.text)
      .addField("Suggestion Done",oldMsg.embeds[0].fields[0].value)
      .setColor("#42b0f4")
  await oldMsg.edit({ embed })
  if (message.deletable) {
    message.delete().catch(() => {});
  }
}
exports.data = {
    triggers: ['sugdone'],
    description: 'Makes a suggestion marked as done in the suggestion channel',
    usage: [
        '{prefix}{command} <id>',
    ],
    args: [
        {
            'type':'id',
            'name':'suggestion id'
        }
    ],
    userPerms: [
        "MANAGE_GUILD"
    ]
}
