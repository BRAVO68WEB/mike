exports.output = async ({message}) => {
    Mike.exec.badosz(message, "porngif", "image")
}
exports.data = {
    triggers: ['porngif'],
    description: 'Shows random porngif image.',
    nsfw: true
}
