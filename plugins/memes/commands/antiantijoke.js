exports.output = async ({message}) => {
  Mike.models.reddit({
    object: message,
    sub: 'AntiAntiJokes',
    type: 'text'
  })
}

exports.data = {
    triggers: ['antiantijoke'],
    description: `Shows random AntiAntiJokes post.`
}
