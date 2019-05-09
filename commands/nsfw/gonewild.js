exports.output = async ({message}) => {
    Mike.exec.badosz(message, "gonewild", "image")
}
exports.data = {
    triggers: ['gonewild'],
    description: 'Shows random gonewild image.',
    nsfw: true
}
