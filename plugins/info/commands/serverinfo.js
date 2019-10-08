exports.output = async ({message}) => {
  const regions = {
    "europe":":flag_eu: Europe",
    "india": ":flag_in: India",
    "brazil":":flag_br: Brazil",
    "hongkong":":flag_hk: Hongkong",
    "japan": ":flag_jp: Japan",
    "russia": ":flag_ru: Russia",
    "singapore": ":flag_sg: Singapore",
    "southafrica":":flag_za: South Africa",
    "sydney": ":flag_au: Sydney",
    "us-central":":flag_us: United States of America",
    "us-east":":flag_us: United States of America",
    "us-south": ":flag_us: United States of America",
    "us-west":":flag_us: United States of America"
  }
  Mike.models.mult({
    object: message,
    message: '**Server Info**',
    fields: [
      ['Server Owner', message.guild.owner.user.tag ,true],
      ['Server creation date',message.guild.createdAt.toUTCString().substr(0, 16),true],
      ['Server ID',message.guild.id,true],
      ['Server Region', regions[message.guild.region] ,true],
      ['Channels', `Text: ${message.guild.channels.filter(c => c.type == 'text').size}\nVoice: ${message.guild.channels.filter(c=> c.type == 'voice').size}`, true],
      ['Bots', message.guild.members.filter(member => member.user.bot).size, true]
    ],
    thumbnail: message.guild.icon ? message.guild.iconURL : `https://dummyimage.com/128/7289DA/FFFFFF/&text=${encodeURIComponent(message.guild.nameAcronym)}`
  })
}

exports.data = {
  triggers: ['serverinfo','server'],
  description: 'Shows server info.',
}
