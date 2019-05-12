exports.output = async ({message}) => {
    Mike.exec.badosz(message, "nsfw", "image")
}
exports.data = {
    triggers: ['nsfwpic'],
    description: 'Shows random nsfw image.',
    nsfw: true,
    voter: true
}
