exports.output = async ({message}) => {
    Mike.exec.badosz(message, "boobs", "image")
}
exports.data = {
    triggers: ['boobs'],
    description: 'Shows random boobs image.',
    nsfw: true
}
