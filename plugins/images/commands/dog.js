exports.output = async ({message}) => {
  Mike.models.apibadosz({
    object: message,
    title: ':dog:',
    endpoint: 'dog'
  })
}

exports.data = {
    triggers: ['dog'],
    description: 'Shows random dog image.'
}
