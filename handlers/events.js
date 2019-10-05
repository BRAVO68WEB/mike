const eRequire = (event) => require(`../events/${event}`)
class events {
  constructor(Mike) {
    Mike.on('ready', () => eRequire('ready')())
    Mike.on('message', message => eRequire('message')(message))
    Mike.on('messageDelete', message => eRequire('messageDelete')(message))
    Mike.on('messageUpdate', (oldMessage, newMessage) => eRequire('messageUpdate')(oldMessage, newMessage))
    Mike.on('voiceStateUpdate', (oldMember, newMember) => eRequire('voiceStateUpdate')(oldMember, newMember))
    Mike.on('messageReactionAdd', (reaction, user) => eRequire('messageReactionAdd')(reaction, user))
    Mike.on('messageReactionRemove', (reaction, user) => eRequire('messageReactionRemove')(reaction, user))
    Mike.on('guildMemberAdd', (member) => eRequire('guildMemberAdd')(member))
    Mike.on('guildMemberRemove', (member) => eRequire('guildMemberRemove')(member))
    Mike.on('guildCreate', (guild) => eRequire('guildCreate')(guild))
    Mike.on('guildDelete', (guild) => eRequire('guildDelete')(guild))
    Mike.on('raw', e => eRequire('raw')(e))
  }
}

module.exports = events
