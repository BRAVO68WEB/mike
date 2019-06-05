const Discord = require('discord.js');

module.exports = async (data) => {

  data = await Object.assign({
      object: null,
      message: `[Missing Message Content]`,
      hightlight: false,
      thumbnail: null,
      image: null,
      color: Mike.color,
      footer: ''
  }, data)

  const embed = new Discord.RichEmbed()
      .setDescription(`${data.hightlight ? `\``: ``}${data.message}${data.hightlight ? `\``: ``}`)
      .setThumbnail(data.thumbnail)
      .setImage(data.image)
      .setColor(data.color)
      .setFooter(data.footer)
  return data.object.channel.send(embed)
}
