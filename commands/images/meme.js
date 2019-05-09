exports.output = async ({message}) => {
    Mike.exec.reddit(message, "meme", "image")
}
exports.data = {
    triggers: ['meme'],
    description: 'Shows random meme.'
}
