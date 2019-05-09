exports.output = async ({message, args}) => {
    try {
        Mike.exec.snap(message,`Are you sure?`)
        const answer = await Mike.Collector.awaitMessage(message.channel.id, message.author.id, 10*1000)
        if (answer.content == "yes") {
            Mike.user.setUsername(args.join(' '));
            return Mike.exec.snap(message,`Done.`)
        }
        if (!answer) return Mike.exec.snap(message,`Cancelled operation.`)

    } catch (e) {
        return Mike.exec.snap(message,`I'm being ratelimited.`)
    }
}
exports.data = {
    triggers: ['setusername'],
    description: 'Changes bot username.',
    usage: [
        '{prefix}{command} <new username>'
    ],
    args: [
            {
                'type':'any',
                'name':'username'
            }
    ],
    developer: true,
    cooldown: 0
}
