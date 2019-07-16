module.exports = async (message, messagePrefix, dbGuild) => {
  if (!message.content.startsWith(messagePrefix)) return
  let [commandName, ...args] = message.content.slice(messagePrefix.length).split(/ +/g)
  const command = dbGuild.plugins.customcmds.find(c => c.name === commandName)

  if(command){
    let output = command.content
      .replace(new RegExp("{user.name}", "g"), message.author.username)
      .replace(new RegExp("{user.mention}", "g"), `<@${message.author.id}>`)
      .replace(new RegExp("{user.tag}", "g"), message.author.discriminator)
      .replace(new RegExp("{user.id}", "g"), message.author.id)

      .replace(new RegExp("{server.name}", "g"), message.guild.name)
      .replace(new RegExp("{server.members}", "g"), message.guild.members.filter(m => !m.user.bot).size)
      .replace(new RegExp("{server.bots}", "g"), message.guild.members.filter(m => m.user.bot).size)
      .replace(new RegExp("{server.id}", "g"), message.guild.id)

      .replace(new RegExp("{channel.id}", "g"), message.channel.id)
      .replace(new RegExp("{channel.mention}", "g"), message.channel)
      .replace(new RegExp("{channel.name}", "g"), message.channel.name)

    if (command.content.includes('{noeveryone}')) {
      output = output.replace('{noeveryone}','').replace('@everyone','')
    }

    if (command.content.includes('{delete}')) {
      output = output.replace('{delete}','')
      message.delete().catch(() => {})
    }

    output = await Mike.utils.string.customparse(output)

    message.channel.send(output)

  }
}
