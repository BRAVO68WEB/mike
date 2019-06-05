const eRequire = (event) => require(`../events/${event}`)
class events {
  constructor(Mike) {
    Mike.on('ready', () => eRequire('ready')())
  }
}

module.exports = events
