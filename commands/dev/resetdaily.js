exports.output = async ({message, args}) => {
    await Mike.db.update('users', message.author.id, 'daily', 0);
    await Mike.db.update('users', message.author.id, 'lastrep', 0);
    await Mike.db.update('users', message.author.id, 'work', 0);
    return Mike.exec.snap(message,`Done.`)
}
exports.data = {
    triggers: ['resetdaily'],
    description: 'Resets daily money for dev.',
    usage: [
        '{prefix}{command}'
    ],
    developer: true,
    cooldown: 0
}
