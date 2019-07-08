exports.output = async ({message}) => {
  Mike.models.reddit({
    object: message,
    sub: 'greentext'
  })
}

exports.data = {
    triggers: ['4chan'],
    description: `Shows random 4chan post.`
}
