exports.output = async ({message}) => {
  Mike.models.apibadosz({
    object: message,
    title: ':bird:',
    endpoint: 'bird'
  })
}

exports.data = {
    triggers: ['bird'],
    description: 'Shows random bird image.'
}
