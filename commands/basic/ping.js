exports.output = async ({message}) => {
    Mike.exec.snap(message, `Api: ${Math.floor(Mike.ping)}ms.\nBot: ${Date.now() - message.createdTimestamp}ms.`)
}
exports.data = {
    triggers: ['ping'],
    description: 'Shows bot ping.'
}
