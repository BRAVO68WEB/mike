exports.output = async ({message}) => {
    Mike.exec.reddit(message, "greentext", "image")
}
exports.data = {
    triggers: ['4chan'],
    description: 'Shows random 4chan post (from reddit).'
}
