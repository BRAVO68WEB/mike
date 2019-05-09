exports.output = async ({message}) => {
    Mike.exec.badosz(message, "teen", "image")
}
exports.data = {
    triggers: ['teen'],
    description: 'Shows random teen image.',
    nsfw: true
}
