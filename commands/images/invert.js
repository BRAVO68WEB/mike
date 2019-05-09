exports.output = async ({message, args}) => {
    const user = await Mike.utils.users.search(message, args[0])
    Mike.exec.badosz(message, `invert?url=${user.displayAvatarURL}`, "image")
}
exports.data = {
    triggers: ['invert'],
    description: 'Generates invert image.',
    usage: [
        '{prefix}{command} [mention]',
        '{prefix}{command} [id]',
        '{prefix}{command} [name]'
    ],
    cooldown: 10
}
