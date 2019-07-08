exports.output = async ({message}) => {
  Mike.models.reddit({
    object: message,
    sub: 'me_irl'
  })
}

exports.data = {
  triggers: ['meirl'],
    description: `Shows random meirl post.`
}
