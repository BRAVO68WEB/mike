exports.output = async ({message}) => {
    Mike.exec.reddit(message, "me_irl", "image")
}
exports.data = {
    triggers: ['meirl','me_irl'],
    description: 'Shows random meirl post.'
}
