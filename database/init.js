const r = require('rethinkdb')

module.exports = async (database) => {
  try {
    Mike.db.connection = await r.connect(database)
  } catch (e) {
    
    if (e.message.includes('ECONNREFUSED')) {
      Mike.console.error(`No RethinkDB detected.`)
    }

    Mike.console.warn(`Mike has frozen own process. Please reboot.`)
    Mike.console.error(e)
    while (true) {}
  }
}
