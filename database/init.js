const r = require('rethinkdb');

module.exports = async (database) => {
  Mike.db.connection = await r.connect(database)
}
