exports.output = async ({message}) => {
    Mike.exec.reddit(message, "comics", "image")
}
exports.data = {
    triggers: ['comic'],
    description: 'Shows random comic.'
}
