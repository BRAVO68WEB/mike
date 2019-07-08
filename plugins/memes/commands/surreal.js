exports.output = async ({message}) => {
  Mike.models.reddit({
    object: message,
    sub: 'surrealmemes'
  })
}

exports.data = {
  triggers: ['surreal'],
    description: `Shows random surreal post.`
}
