exports.output = async ({message, args}) => {
    const xuser = await Mike.utils.users.search(message, args[0])
    if(xuser.bot) return Mike.exec.error(message, 'Bots don\'t have reputation.')
    if(xuser.id == message.author.id) return Mike.exec.error(message, 'You cannot give yourself reputation.')
    const user = await Mike.db.getUser(message.author.id);
    const lastrep = user.lastrep ? user.lastrep : 0;
    if (lastrep < Math.trunc(Date.now() - 86400000)) {
        await Mike.db.update('users', message.author.id, 'lastrep', Math.trunc(Date.now()));
        await Mike.db.addRep(xuser.id, 1)
       return Mike.exec.snap(message,`${xuser.tag} recived reputation!`)
    } else {
        const left = Math.abs((Date.now() - 86400000 - lastrep) / 1000);
        return Mike.exec.error(message, `You can't give reputation right now!\nWait another: ${Math.trunc(left / 60 / 60 % 24)} hours, ${Math.trunc(left / 60 % 60)} minutes and ${Math.trunc(left % 60)} seconds.`)
    }
}
exports.data = {
    triggers: ['rep'],
    description: 'Give someone rep points.',
    usage: [
        '{prefix}{command} [mention]',
        '{prefix}{command} [id]',
        '{prefix}{command} [name]'
    ],
    args: [
        {
            'type':'any',
            'name':'user'
        }
    ]

}
