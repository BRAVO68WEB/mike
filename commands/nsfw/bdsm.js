exports.output = async ({message}) => {
    Mike.exec.badosz(message, "bdsm", "image")
}
exports.data = {
    triggers: ['bdsm'],
    description: 'Shows random bdsm image.',
    nsfw: true
}
