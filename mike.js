const { Client } = require('discord.js')
const os = require('os')

class Mike extends Client {
  constructor(bot) {
    super(bot)

    global.Mike = this

    this.files = [
      'tokens',
      'prefixes',
      'dashboards',
      'databases',
      'items',
      'links',
      'roles',
      'customEmojis',
      'lavalink',
      'gifs',
      'bg'
    ]

    this.files.forEach(file => {
      this[file] = require(`./files/${file}.json`)
    })

    this.http = require('snekfetch')

    this.eventHandler = new (require('./handlers/events.js'))(this)

    this.console = require('./handlers/console.js')

    this.db = require('./database')
    this.models = require('./models')
    this.utils = require('./utils')

    this.cache = {
      youtube: {},
      guilds: {}
    }

    this.color = '#ffe680'

    this.type = (['badosz-pc','DESKTOP-5OKDRVN'].includes(os.hostname()) ? 'beta' : 'main')

    this.db.init(this.databases[this.type])
    this.prefix = this.prefixes[this.type]
    this.dashboard = this.dashboards[this.type]
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
