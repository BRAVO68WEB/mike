exports.output = async ({message}) => {
    Mike.exec.badosz(message, "lesbian", "image")
}
exports.data = {
    triggers: ['lesbian'],
    description: 'Shows random lesbian image.',
    nsfw: true,
    voter: true
}
