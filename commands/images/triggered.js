exports.output = async ({message, args}) => {
    const user = await Mike.utils.users.search(message, args[0])
    Mike.exec.badosz(message, `triggered?url=${user.displayAvatarURL}`, "image")
}
exports.data = {
    triggers: ['triggered'],
    description: 'Generates triggered gif.',
    usage: [
        '{prefix}{command} [mention]',
        '{prefix}{command} [id]',
        '{prefix}{command} [name]'
    ],
    cooldown: 10
}
