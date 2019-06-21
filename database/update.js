const r = require('rethinkdb')

module.exports = async (obj, id, k, v) => {
    try {
        await r.table(obj)
                .get(id)
                .update({ [k]: v })
                .run(Mike.db.connection)
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}
