exports.output = async ({message}) => {
    Mike.exec.badosz(message, "dog", "image")
}
exports.data = {
    triggers: ['dog'],
    description: 'Shows random dog image.'
}
