const eRequire = (event) => require(`../events/${event}`)
class events {
  constructor(Mike) {
    Mike.on('ready', () => eRequire('ready')())
    Mike.on('message', message => eRequire('message')(message))
    Mike.on('messageDelete', message => eRequire('messageDelete')(message))
    Mike.on('voiceStateUpdate', (oldMember, newMember) => eRequire('voiceStateUpdate')(oldMember, newMember))
  }
}

module.exports = events
