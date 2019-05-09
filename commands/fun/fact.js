exports.output = async ({message}) => {
    Mike.exec.badosz(message, "fact", "text", "fact")
}
exports.data = {
    triggers: ['fact'],
    description: 'Shows random fact.'
}
