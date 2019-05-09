exports.output = async ({message, args}) => {
    const user = await Mike.utils.users.search(message, args[0])
    Mike.exec.badosz(message, "hug", "image", "", `${message.author.username} has hugged ${user.username}!`)
}
exports.data = {
    triggers: ['hug'],
    description: 'Hug someone.',
    usage: [
        '{prefix}{command} [mention]',
        '{prefix}{command} [id]',
        '{prefix}{command} [name]'
    ]
}
