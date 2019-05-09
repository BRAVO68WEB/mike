const Discord = require('discord.js');

exports.output = async ({message, args}) => {

  winnerCount = args[0];
  title = args[1].charAt(0).toUpperCase() + args[1].slice(1)

  let reaction = [ '📦', '🎈', '🎊', '🎉', '🎁'];
  reaction = reaction[Math.floor(Math.random() * reaction.length)];

  let giveawayMessage = new Discord.RichEmbed()
      .setAuthor('Giveaway!')
      .setTitle(`**${title}**\n\n`)
      .setDescription(`_React with ${reaction} to enter._\n`)
      .setFooter(`${winnerCount} Winner${winnerCount == 1 ? '' : 's'}`);
  giveawayMessage =  await message.channel.send(giveawayMessage)
  await giveawayMessage.react(reaction);

}
exports.data = {
    triggers: ['giveaway'],
    description: 'Runs a giveaway.',
    usage: [
        '{prefix}{command} <winners> <title>'
    ],
    args: [
        {
            'type':'int',
            'name':'winners'
        },
        {
            'type':'any',
            'name':'title'
        },
    ],
    userPerms: [
        "MANAGE_GUILD"
    ]
}
