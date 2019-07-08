exports.output = async ({message}) => {
  Mike.models.reddit({
    object: message,
    sub: 'facepalm'
  })
}

exports.data = {
  triggers: ['facepalm'],
    description: `Shows random facepalm post.`
}
