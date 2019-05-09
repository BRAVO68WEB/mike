exports.output = async ({message}) => {
    Mike.exec.snap(message, await Mike.utils.lennyface.random())
}
exports.data = {
    triggers: ['lenny', 'lennyface'],
    description: 'Shows random Joke post.'
}
