const r = require('rethinkdb');

module.exports = async (filter) => {
        let data = await r.table('guilds').orderBy('').filter(filter).run(Mike.db.connection)
        return data


}
