const { Client } = require('discord.js')
const os = require('os')

class Mike extends Client {
  constructor(bot) {
    super(bot)

    global.Mike = this

    this.tokens = require('./files/tokens.json')

    if (os.hostname() == 'badosz-pc') {
      this.login(this.tokens.beta)
    } else {
      this.login(this.tokens.beta)
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
