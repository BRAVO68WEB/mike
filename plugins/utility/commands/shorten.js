exports.output = async ({message, args}) => {
  const link = args.slice(0).join(' ')
  if(!await Mike.utils.regex.link(link)) {
    return Mike.models.snap({
      object: message,
      message: `\`Provide a valid link.\``,
      color: '#f44262'
     })
  }
  const data = await Mike.http.get(`https://is.gd/create.php?format=json&url=${encodeURIComponent(link)}`).catch(e => {
    return Mike.models.snap({
      object: message,
      message: `\`Try again later\``,
      color: '#f44262'
     })
  });
  return Mike.models.snap({
    object: message,
    message: `${JSON.parse(data.text).shorturl}`
  })
}
exports.data = {
  triggers: ['shorten'],
  description: 'Shorts link.',
  usage: [
    '{prefix}{command} <link>',
  ],
  args: [
    {
        'type':'text',
        'name':'link'
    }
  ]
}
