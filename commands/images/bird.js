exports.output = async ({message}) => {
    Mike.exec.badosz(message, "bird", "image")
}
exports.data = {
    triggers: ['bird'],
    description: 'Shows random bird image.'
}
