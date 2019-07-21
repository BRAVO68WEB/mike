const r = require('rethinkdb')

module.exports = async (id, amount) => {
  try {
    await r.table('users')
            .get(id)
            .update({
                rep:r.row('rep').add(amount)
            })
            .run(Mike.db.connection)
  } catch (e) {
    console.error(e)
    return false
  }
}
