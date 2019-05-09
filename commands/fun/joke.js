exports.output = async ({message}) => {
    Mike.exec.reddit(message, "Jokes", "text")
}
exports.data = {
    triggers: ['joke'],
    description: 'Shows random Joke post.'
}
