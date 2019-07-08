exports.output = async ({message, args}) => {
  Mike.models.apibadosz({
    object: message,
    endpoint: `chucknorris`,
    output: 'joke',
    type: 'text'
  })
}

exports.data = {
  triggers: ['chucknorris'],
  description: 'Sends random chuck norris joke.',
}
