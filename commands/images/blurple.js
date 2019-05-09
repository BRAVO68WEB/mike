exports.output = async ({message, args}) => {
    const user = await Mike.utils.users.search(message, args[0])
    Mike.exec.badosz(message, `blurple?url=${user.displayAvatarURL}`, "image")
}
exports.data = {
    triggers: ['blurple'],
    description: 'Generates blurple image.',
    usage: [
        '{prefix}{command} [mention]',
        '{prefix}{command} [id]',
        '{prefix}{command} [name]'
    ],
    cooldown: 10
}
