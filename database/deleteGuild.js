const r = require('rethinkdb')

module.exports = async (id) => {
  try {
    await r.table('guilds')
      .get(id)
      .delete()
      .run(Mike.db.connection)
    delete Mike.cache.guilds[guild]
  } catch (e) {
    console.error(e)
    return false
  }
}
