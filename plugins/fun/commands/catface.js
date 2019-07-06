exports.output = async ({message}) => {
  Mike.models.apibadosz({
    object: message,
    endpoint: 'cat',
    type: 'text',
    output: 'cat'
  })
}
exports.data = {
    triggers: ['catface'],
    description: 'Shows random catface.'
}
