exports.output = async ({message}) => {
  Mike.models.apibadosz({
    object: message,
    title: ':dog:',
    endpoint: 'shibe'
  })
}

exports.data = {
    triggers: ['shibe'],
    description: 'Shows random shibe image.'
}
