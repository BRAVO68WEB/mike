exports.output = async ({message}) => {
    Mike.exec.badosz(message, "hentai", "image")
}
exports.data = {
    triggers: ['hentai'],
    description: 'Shows random hentai image.',
    nsfw: true
}
