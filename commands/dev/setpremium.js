exports.output = async ({message, args}) => {
    await Mike.db.update('guilds', args[0], 'ispremium', true);
    return Mike.exec.snap(message,`Done.`)
}
exports.data = {
    triggers: ['setpremium'],
    description: 'Sets premium for guild id.',
    usage: [
        '{prefix}{command} <id>'
    ],
    developer: true,
    cooldown: 0
}
