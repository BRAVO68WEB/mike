exports.output = async ({message}) => {
  Mike.models.reddit({
    object: message,
    sub: 'AntiJokes',
    type: 'text'
  })
}

exports.data = {
    triggers: ['antijoke'],
    description: `Shows random AntiJokes post.`
}
