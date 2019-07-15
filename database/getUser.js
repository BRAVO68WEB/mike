const r = require('rethinkdb')

module.exports = async (id) => {
  let user = await r.table('users').get(id).run(Mike.db.connection)
  if (!user) {
    user = (await r.table('users').insert({
      id: id,
      tag: `[Unknown] (${id})`,
      inventory: [],
      rep: 0,
      daily: 0,
      work: 0,
      lastrep: 0,
      money: 0,
      pocket: 0,
      xp: 0,
      commands: 0
    }, {
        returnChanges: true
    }).run(Mike.db.connection)).changes[0].new_val
  }
  return user
}
