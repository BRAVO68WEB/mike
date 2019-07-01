exports.output = async ({message}) => {
  const api = await Mike.http.get('http://aws.random.cat/meow')

  Mike.models.snap({
    object: message,
    message: `:cat:`,
    image: api.body.file
  })
}

exports.data = {
    triggers: ['meow'],
    description: 'Shows cat image.'
}
