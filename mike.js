const { Client } = require('discord.js')
const os = require('os')

class Mike extends Client {
  constructor(bot) {
    super(bot)

    global.Mike = this

    this.tokens = require('./files/tokens.json')
    this.prefixes = require('./files/prefixes.json')

    this.eventHandler = new (require('./handlers/events.js'))(this)

    if (os.hostname() == 'badosz-pc') {
      this.prefix = this.prefixes.beta
      this.login(this.tokens.beta)
    } else {
      this.prefix = this.prefixes.main
      this.login(this.tokens.main)
    }

  }
}

const Core = new Mike (
  {
    disabledEvents: [
      'TYPING_START',
    ]
  }
)
