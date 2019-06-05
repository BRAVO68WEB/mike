exports.output = async ({message}) => {
  Mike.models.snap({
    object: message,
    message: `test`,
  })
}

exports.data = {
    triggers: ['test'],
    description: 'Test.'
}
