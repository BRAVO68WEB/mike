exports.output = async ({message, args}) => {
  const guild = await Mike.db.getGuild(message.guild.id)
  suggestionChannel = message.guild.channels.filter(channel => channel.type === 'text').get(guild.settings.suggestions.channel);
  if (!suggestionChannel) {
    return Mike.exec.error(message, "Suggestion channel not found.")
  }
  message.channel = suggestionChannel
  let suggestion = await Mike.exec.mult(message, [["Suggestion",args.join(" "),true]],`Suggested by ${message.author.tag}`,null, null,"#dbbf59")
  await suggestion.react('👍');
  await suggestion.react('👎');
  if (message.deletable) {
    message.delete().catch(() => {});
  }
}
exports.data = {
    triggers: ['suggest'],
    description: 'Posts a suggestion to the suggestion channel',
    usage: [
        '{prefix}{command} <suggestion>',
    ],
    args: [
        {
            'type':'any',
            'name':'suggestion'
        }
    ]
}
