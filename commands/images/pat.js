exports.output = async ({message, args}) => {
    const user = await Mike.utils.users.search(message, args[0])
    Mike.exec.badosz(message, "pat", "image", "", `${message.author.username} has patted ${user.username}!`)
}
exports.data = {
    triggers: ['patted'],
    description: 'Pat someone.',
    usage: [
        '{prefix}{command} [mention]',
        '{prefix}{command} [id]',
        '{prefix}{command} [name]'
    ]
}
