exports.output = async ({message}) => {
  Mike.models.apibadosz({
    object: message,
    title: ':fox:',
    endpoint: 'fox'
  })
}

exports.data = {
    triggers: ['fox'],
    description: 'Shows random fox image.'
}
