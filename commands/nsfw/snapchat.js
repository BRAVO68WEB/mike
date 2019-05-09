exports.output = async ({message}) => {
    Mike.exec.badosz(message, "snapchat", "image")
}
exports.data = {
    triggers: ['snapchat'],
    description: 'Shows random snapchat image.',
    nsfw: true
}
