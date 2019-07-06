exports.output = async ({message}) => {
  Mike.models.apibadosz({
    object: message,
    endpoint: 'advice',
    type: 'text',
    output: 'advice'
  })
}
exports.data = {
  triggers: ['advice'],
  description: 'Shows random advice.'
}
