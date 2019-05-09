exports.output = async ({message}) => {
    Mike.exec.badosz(message, "chucknorris", "text", "joke")
}
exports.data = {
    triggers: ['chucknorris','chuck'],
    description: 'Shows random Chuck Norris joke.'
}
