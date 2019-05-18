exports.output = async ({message}) => {
    Mike.exec.reddit(message, "AntiJokes", "text")
}
exports.data = {
    triggers: ['antijoke'],
    description: 'Shows random AntiAntiJokes post.'
}
