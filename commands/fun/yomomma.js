exports.output = async ({message}) => {
    Mike.exec.badosz(message, "yomomma", "text", "joke")
}
exports.data = {
    triggers: ['yomomma'],
    description: 'Shows random yomomma joke.'
}
