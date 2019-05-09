const r = require('rethinkdb');

module.exports = async (entry) => {
    try {
        await r.table('guilds')
                .insert(entry, { conflict: 'update' })
                .run(Mike.db.connection);
    } catch (e) {
        console.error(e);
        return false;
    }
}
