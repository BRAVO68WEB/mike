const r = require('rethinkdb');

module.exports = async (id) => {
    try {
        await r.table('users')
                .get(id)
                .update({
                    commands:r.row('commands').add(1)
                })
                .run(Mike.db.connection);
    } catch (e) {
        console.error(e);
        return false;
    }
}
