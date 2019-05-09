const Discord = require('discord.js');

exports.output = async ({message, args}) => {

  let participants = []
  let winners

  giveawayMessage = await message.channel.fetchMessage(args[0]);

  let winnerCount = giveawayMessage.embeds[0].footer.text.slice("Winner")[0];
  let title = giveawayMessage.embeds[0].title
  let reaction = giveawayMessage.reactions.first()._emoji.name

  if (giveawayMessage.reactions.has(reaction)) {
    participants = giveawayMessage.reactions.get(reaction).users.filter(user => !user.bot).map(u => `**${u.tag}** (${u.id})`)
  }

  console.log(participants)
  if (participants.length) {
      winners = await Mike.utils.array.random(participants, winnerCount, true);
  }
  if (winners) {
      let giveawayMessageEnd = new Discord.RichEmbed()
          .setAuthor('Giveaway ended')
          .setTitle(title)
          .setDescription(`\n__Winners:__\n${winners.join('\n')}`)
      await giveawayMessage.edit(giveawayMessageEnd).catch(e => {
          if (e.code !== 50001) {
            throw e;
          }
        });
  }
  else{
      let giveawayMessageEnd = new Discord.RichEmbed()
          .setAuthor('Giveaway ended')
          .setTitle(title)
          .setDescription(`\n\`No one participated and there's no winner.\``);
      await giveawayMessage.edit(giveawayMessageEnd).catch(e => {
          if (e.code !== 50001) {
            throw e;
          }
        });
  }
  console.log(participants)



}
exports.data = {
    triggers: ['giveawayend'],
    description: 'Ends a giveaway.',
    usage: [
        '{prefix}{command} <id>'
    ],
    args: [
        {
            'type':'id',
            'name':'id'
        }
    ],
    userPerms: [
        "MANAGE_GUILD"
    ]
}
