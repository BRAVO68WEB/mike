const Discord = require('discord.js');

module.exports = async (data) => {

  data = await Object.assign({
      object: null,
      description: '',
      fields: [],
      hightlight: false,
      thumbnail: null,
      image: null,
      color: Mike.color,
      footer: ''
  }, data)

  const embed = new Discord.RichEmbed()
      .setDescription(`${data.hightlight ? `\``: ``}${data.description}${data.hightlight ? `\``: ``}`)
      .setThumbnail(data.thumbnail)
      .setImage(data.image)
      .setColor(data.color)
      .setFooter(data.footer)
      data.fields.forEach(field => {
        if (field[0] == 'blank') {
          embed.addBlankField()
        } else {
          embed.addField(field[0], field[1], field[2])
        }
      })
  return data.object.channel.send(embed)
}
