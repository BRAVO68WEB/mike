const { Client } = require('discord.js');
const Managers = require('./managers')
const Handlers = require('./handlers')
const os = require('os');
const DBL = require('dblapi.js');

class Mike extends Client{
    constructor(bot){
        super(bot)

        global.Mike = this

        this.player = null
        this.queue = {}
        this.categories = []

        this.managers = {}
        this.managers.eventloader = new Managers.EventLoader(this)
        this.managers.commandsloader = new Managers.CommandsLoader(this)

        this.exec = new Handlers.Exec(this)
        this.cooldowns = new Set()

        this.config = {}
        this.config.tokens = require('./files/tokens.json')
        this.config.lavalink = require('./files/lavalink.json')
        this.config.prefixes = require('./files/prefixes.json')
        this.config.roles = require('./files/roles.json')
        this.config.database = require('./files/database.json')

        this.items = require('./files/items.json')

        this.utils = require('./utils')
        this.db = require('./database')
        this.datadog = require('./datadog')
        this.music = require('./music')

        this.stats = {}
        this.stats.games = {}
        this.stats.songs = {}
        this.stats.events = {}
        this.stats.commands = {}
        this.stats.events.total = 0
        this.stats.events.errors = 0
        this.stats.events.voiceUpdates = 0
        this.stats.events.reactions = 0
        this.stats.messages = {}
        this.stats.messages.total = 0
        this.stats.messages.updates = 0
        this.stats.messages.deletions = 0
        this.stats.commands.total = 0

        this.dbl = 0
        this.type = 'main'
        this.prefix = this.config.prefixes.main
        this.config.database.selected = this.config.database.main

        if (os.release() == `4.18.0-18-generic`) { // new os
            this.type = 'beta'
            this.prefix = this.config.prefixes.beta
            this.config.database.selected = this.config.database.beta
        } else {
            this.dbl = new DBL(this.config.tokens.dblist, this)
        }

        this.db.load()
        this.datadog.init()
        if(this.type == 'beta'){
            this.login(this.config.tokens.beta)
        } else {
            this.login(this.config.tokens.main)
        }

    }


}

const Core = new Mike(
  {
      disabledEvents: [
          'TYPING_START',
      ]
  }
)
