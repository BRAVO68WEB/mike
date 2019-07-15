exports.output = async ({message}) => {
    const regions = {
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
        ['Server Owner', message.guild.owner.user.tag ,true],
        ['Server creation date',message.guild.createdAt.toUTCString().substr(0, 16),true],
        ['Server ID',message.guild.id,true],
        ['Server Region', regions[message.guild.region] ,true],
        ['Members', `${Mike.customEmojis.statusOnline} Online: ${message.guild.members.filter(m => m.presence.status == 'online').size}\n${Mike.customEmojis.statusDnd} Dnd: ${message.guild.members.filter(m => m.presence.status == 'dnd').size}\n${Mike.customEmojis.statusIdle} Idle: ${message.guild.members.filter(m => m.presence.status == 'idle').size}\n${Mike.customEmojis.statusOffline} Offline: ${message.guild.memberCount - message.guild.presences.array().length}`,true],
        ['Bots',message.guild.members.filter(member => member.user.bot).size,true],
        ['Channels', `Text: ${message.guild.channels.filter(c => c.type == 'text').size}\nVoice: ${message.guild.channels.filter(c => c.type == 'voice').size}`, true]
      ],
      thumbnail: message.guild.iconURL
    })
}
exports.data = {
  triggers: ['serverinfo','server'],
  description: 'Shows server info.',
}
