exports.output = async ({message}) => {
  Mike.models.snap({
    object: message,
    message: `Api: \`${Math.floor(Mike.ping)}ms.\`
              Bot: \`${Date.nowd() - message.createdTimestamp}ms.\``,
  })
}

exports.data = {
    triggers: ['ping'],
    description: 'Shows bot ping.'
}
