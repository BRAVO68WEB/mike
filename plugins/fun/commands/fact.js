exports.output = async ({message}) => {
  Mike.models.apibadosz({
    object: message,
    endpoint: 'fact',
    type: 'text',
    output: 'fact'
  })
}
exports.data = {
    triggers: ['fact'],
    description: 'Shows random fact.'
}
