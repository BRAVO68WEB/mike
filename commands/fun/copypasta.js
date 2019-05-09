exports.output = async ({message}) => {
    Mike.exec.reddit(message, "copypasta", "text")
}
exports.data = {
    triggers: ['copypasta'],
    description: 'Shows random copypasta post.'
}
