const { Client } = require('discord.js');
class Mike extends Client {
    constructor(bot) {
        super(bot)

        global.Mike = this
}

const Core = new Mike(
  {
      disabledEvents: [
          'TYPING_START',
      ]
  }
)
