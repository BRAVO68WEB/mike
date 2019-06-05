exports.output = async ({message}) => {
  Mike.models.snapx({
    object: message,
    message: `Api: \`${Math.floor(Mike.ping)}ms.\`
              Bot: \`${Date.now() - message.createdTimestamp}ms.\``,
  })
}

exports.data = {
    triggers: ['ping'],
    description: 'Shows bot ping.'
}
