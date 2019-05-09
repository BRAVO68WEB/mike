exports.output = async ({message}) => {
    Mike.exec.badosz(message, "shibe", "image")
}
exports.data = {
    triggers: ['shibe'],
    description: 'Shows random shibe image.'
}
