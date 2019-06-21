const { RichEmbed }= require('discord.js')

module.exports = async (reaction, user) => {
  if (!reaction.message.guild) return
  if (reaction.emoji.name !== "⭐") return

  const guild = await Mike.db.getGuild(reaction.message.guild.id)
  if (guild.settings.disabledPlugins.includes("starboard")) return

  const starChannel = reaction.message.guild.channels.get(guild.star.channel)
  const hasContent = reaction.message.content && reaction.message.content.length || reaction.message.attachments.size && reaction.message.attachments.first().height

  const total = reaction.message.reactions.find(r => r.emoji.name === '⭐') ? reaction.message.reactions.find(r => r.emoji.name === '⭐').count : 0
  const fetch = await starChannel.fetchMessages({ limit: 100 })

  const starMsg = fetch.find(m => m.content.startsWith("⭐") && m.embeds[0] && m.embeds[0].footer && m.embeds[0].footer.text.endsWith(reaction.message.id))

  if (hasContent && total >= guild.star.number) {
    let image
    if (reaction.message.attachments.size) {
      if (reaction.message.attachments.first().height) {
        image = reaction.message.attachments.first().url
      }
    }
    if (image || reaction.message.content) {
      if (reaction.message.guild.channels.has(guild.star.channel)) {
        const embed = new RichEmbed()
          .setDescription(`${reaction.message.content}\n\n[[link]](https://discordapp.com/channels/${reaction.message.guild.id}/${reaction.message.channel.id}/${reaction.message.id})`)
          .setFooter(`ID: ${reaction.message.id}`)
          .setAuthor(reaction.message.author.tag, reaction.message.author.displayAvatarURL)
          .setImage(image)
          .setColor("#FBB02A")
          .setTimestamp()
        if(starMsg){
          const oldMsg = await starChannel.fetchMessage(starMsg.id)
          await oldMsg.edit(`⭐**${reaction.message.reactions.get("⭐").count}** | ${reaction.message.channel}`,{embed})
        } else {
          reaction.message.guild.channels.get(guild.star.channel).send(`⭐**${reaction.message.reactions.get("⭐").count}** | ${reaction.message.channel}`,{embed})
        }

      }
    }
  }
}
