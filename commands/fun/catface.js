exports.output = async ({message}) => {
    Mike.exec.badosz(message, "cat", "text", "cat")
}
exports.data = {
    triggers: ['catface'],
    description: 'Shows random catface.'
}
