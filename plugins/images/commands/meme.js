exports.output = async ({message}) => {
  Mike.models.reddit({
    object: message,
    sub: 'meme'
  })
}

exports.data = {
    triggers: ['meme'],
    description: 'Shows meme image.'
}
