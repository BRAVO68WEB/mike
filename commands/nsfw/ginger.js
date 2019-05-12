exports.output = async ({message}) => {
    Mike.exec.badosz(message, "ginger", "image")
}
exports.data = {
    triggers: ['ginger'],
    description: 'Shows random ginger image.',
    nsfw: true,
    voter: true
}
