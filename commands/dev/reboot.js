exports.output = async ({message, args}) => {
  Mike.exec.snap(message,`Are you sure? ${Mike.player.filter(p=>p.playing).size}/${Mike.player.size} players are playing music.`)
    try {
        const answer = await Mike.Collector.awaitMessage(message.channel.id, message.author.id, 10*1000)
        if (answer.content == "yes") {
            await Mike.exec.snap(message,`Rebooting.`)
            process.exit()
        }
        if (!answer) return Mike.exec.snap(message,`Cancelled operation.`)

    } catch (e) {
        return Mike.exec.snap(message,`I'm being ratelimited.`)
    }
}
exports.data = {
    triggers: ['reboot'],
    description: 'Reboots bot.',
    usage: [
        '{prefix}{command}'
    ],
    developer: true,
    cooldown: 0
}
