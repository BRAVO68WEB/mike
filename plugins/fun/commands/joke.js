exports.output = async ({message}) => {
  Mike.models.apibadosz({
    object: message,
    endpoint: 'dadjoke',
    type: 'text',
    output: 'joke'
  })
}
exports.data = {
  triggers: ['joke'],
  description: 'Shows random Joke post.'
}
