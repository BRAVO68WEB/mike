exports.output = async ({message, args}) => {
  Mike.models.apibadosz({
    object: message,
    endpoint: `yomomma`,
    output: 'joke',
    type: 'text'
  })
}

exports.data = {
  triggers: ['yomomma'],
  description: 'Sends random yomomma joke.',
}
