exports.output = async ({message, args}) => {
    const user = await Mike.utils.users.search(message, args[0])
    Mike.exec.badosz(message, `wasted?url=${user.displayAvatarURL}`, "image")
}
exports.data = {
    triggers: ['wasted'],
    description: 'Generates wasted image.',
    usage: [
        '{prefix}{command} [mention]',
        '{prefix}{command} [id]',
        '{prefix}{command} [name]'
    ],
    cooldown: 10
}
