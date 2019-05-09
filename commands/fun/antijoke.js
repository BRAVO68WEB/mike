exports.output = async ({message}) => {
    Mike.exec.reddit(message, "AntiAntiJokes", "text")
}
exports.data = {
    triggers: ['antiantijoke'],
    description: 'Shows random AntiJokes post.'
}
