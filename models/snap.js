const Discord = require('discord.js')

module.exports = async (data) => {

  data = await Object.assign({
      object: null,
      message: `[Missing Message Content]`,
      hightlight: false,
      thumbnail: null,
      image: null,
      color: Mike.color,
      footer: '',
      inmessage: '',
      author: [``, null],
      file: null,
      title: '',
      url: null
  }, data)

  const embed = new Discord.RichEmbed()
      .attachFile(data.file)
      .setDescription(`${data.hightlight ? `\``: ``}${data.message}${data.hightlight ? `\``: ``}`)
      .setThumbnail(data.thumbnail)
      .setImage(data.image)
      .setColor(data.color)
      .setTitle(data.title)
      .setFooter(data.footer)
      .setAuthor(data.author[0], data.author[1])
      .setURL(data.url)
  return data.object.channel.send(data.inmessage, {embed})
}
