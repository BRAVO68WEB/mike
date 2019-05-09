const r = require('rethinkdb');

module.exports = async () => {
    try {
        Mike.db.connection = await r.connect(Mike.config.database.selected.database);
        await Promise.all([
            r.tableCreate('users').run(Mike.db.connection),
            r.tableCreate('guilds').run(Mike.db.connection),
            r.tableCreate('global').run(Mike.db.connection),
        ]);
    } catch(error) {
        if (error.message.includes('already exists')) {
            // console.log('Database exist.');
        } else {
            console.error(error);
        }
    }
};
