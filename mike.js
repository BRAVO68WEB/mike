const { Client } = require('discord.js')
const os = require('os')

class Mike extends Client {
  constructor(bot) {
    super(bot)

    global.Mike = this

    this.tokens = require('./files/tokens.json')
    this.prefixes = require('./files/prefixes.json')
    this.databases = require('./files/databases.json')
    this.links = require('./files/links.json')
    this.roles = require('./files/roles.json')

    this.eventHandler = new (require('./handlers/events.js'))(this)

    this.db = require('./database')
    this.models = require('./models')

    this.color = '#ffe680'

    this.type = (os.hostname() == 'badosz-pc' ? 'beta' : 'main')

    this.db.init(this.databases[this.type])
    this.prefix = this.prefixes[this.type]
    this.login(this.tokens[this.type])


  }
}

const Core = new Mike (
  {
    disabledEvents: [
      'TYPING_START',
    ]
  }
)
