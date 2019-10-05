const { Client } = require('discord.js')

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
      'bg',
      'colors',
      'logs'
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

    this.color = this.colors.gold
    this.types = ['main', 'beta']

    if (!this.types.includes(process.argv[2])) {
      this.console.error(`Please run Mike with version argument! (${this.types.join(', ')})`)
      this.console.warn(`Mike has frozen own process. Please reboot.`)
      while (true) {}
    }

    this.type = process.argv[2]

    this.db.init(this.databases[this.type].database)
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
