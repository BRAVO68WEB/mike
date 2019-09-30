const Discord = require('discord.js')

module.exports = async (data) => {

  data = await Object.assign({
      object: null,
      description: '',
      fields: [],
      hightlight: false,
      thumbnail: null,
      image: null,
      color: Mike.color,
      footer: '',
      inmessage: '',
      author: [``, null],
      title: '',
  }, data)

  const embed = new Discord.RichEmbed()
      .setTitle(data.title)
      .setDescription(`${data.hightlight ? `\``: ``}${data.description}${data.hightlight ? `\``: ``}`)
      .setThumbnail(data.thumbnail)
      .setImage(data.image)
      .setColor(data.color)
      .setFooter(data.footer)
      .setAuthor(data.author[0], data.author[1])
      data.fields.forEach(field => {
        if (field[0] == 'blank') {
          embed.addBlankField()
        } else {
          embed.addField(field[0], field[1], field[2])
        }
      })
  return data.object.channel.send(data.inmessage, {embed})
}
