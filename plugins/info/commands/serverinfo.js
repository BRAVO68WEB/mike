exports.output = async ({message}) => {
    let regions = {
      "eu-central":":flag_eu: Central Europe",
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
      "us-west":":flag_us: United States of America",
      "eu-west":":flag_eu: West Europe",
    }
    Mike.models.mult({
      object: message,
      message: '**Server Info**',
      fields: [
        ['Server Owner', message.guild.owner,true],
        ['Server creation date',message.guild.createdAt.toUTCString().substr(0, 16),true],
        ['Server ID',message.guild.id,true],
        ['Server Region', regions[message.guild.region] ,true],
        ['Members', `<:dcOnline:495281269391884288> Online: ${message.guild.presences.findAll("status", "online").length}\n<:dcDnd:495281269609857024> Dnd: ${message.guild.presences.findAll("status", "dnd").length}\n<:dcIdle:495281269253603346> Idle: ${message.guild.presences.findAll("status", "idle").length}\n<:dcOffline:495281269379432449> Offline: ${message.guild.memberCount - message.guild.presences.array().length}`,false],
        ['Bots',message.guild.members.filter(member => member.user.bot).size,true],
        ['Channels', `Text: ${message.guild.channels.findAll("type", "text").length}\nVoice: ${message.guild.channels.findAll("type", "voice").length}`, true]
      ],
      thumbnail: message.guild.iconURL
    })
}
exports.data = {
  triggers: ['serverinfo','server'],
  description: 'Shows server info.',
}
