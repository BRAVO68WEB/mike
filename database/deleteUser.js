const r = require('rethinkdb')

module.exports = async (id) => {
  try {
    await r.table('users')
      .get(id)
      .delete()
      .run(Mike.db.connection)
  } catch (e) {
    return false
  }
}
