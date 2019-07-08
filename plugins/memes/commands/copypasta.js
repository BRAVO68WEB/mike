exports.output = async ({message}) => {
  Mike.models.reddit({
    object: message,
    sub: 'copypasta',
    type: 'text'
  })
}

exports.data = {
    triggers: ['copypasta'],
    description: `Shows random copypasta post.`
}
