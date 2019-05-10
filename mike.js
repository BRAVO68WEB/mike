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
        this.music = require('./music')

        this.stats = {}
        this.stats.games = {}
        this.stats.songs = {}

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
