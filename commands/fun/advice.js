exports.output = async ({message}) => {
    Mike.exec.badosz(message, "advice", "text", "advice")
}
exports.data = {
    triggers: ['advice'],
    description: 'Shows random advice.'
}
