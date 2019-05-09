exports.output = async ({message}) => {
    Mike.exec.reddit(message, "facepalm", "image")
}
exports.data = {
    triggers: ['facepalm'],
    description: 'Shows random facepalm post.'
}
