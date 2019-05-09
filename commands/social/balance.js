exports.output = async ({message, args}) => {
    const user = await Mike.utils.users.search(message, args[0])
    if(user.bot) return Mike.exec.error(message, 'Bots don\'t have money.')
    const dbuser = await Mike.db.getUser(user.id)
    Mike.exec.snap(message, `Bank: \`${dbuser.money}\`$ | Pocket: \`${dbuser.pocket}\`$`, false)
}
exports.data = {
    triggers: ['balance','money','bal','cash'],
    description: 'Shows user balance.',
    usage: [
        '{prefix}{command} [mention]',
        '{prefix}{command} [id]',
        '{prefix}{command} [name]'
    ]
}
