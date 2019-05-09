exports.output = async ({message}) => {
    Mike.exec.badosz(message, "fox", "image")
}
exports.data = {
    triggers: ['fox'],
    description: 'Shows random fox image.'
}
