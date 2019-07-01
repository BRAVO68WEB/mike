exports.output = async ({message}) => {
  const max = await Mike.http.get('https://xkcd.com/info.0.json')
  const res = await Mike.http.get(`https://xkcd.com/${Math.floor(Math.random() * max.body.num + 1)}/info.0.json`)
  Mike.models.snap({
    object: message,
    message: res.body.alt,
    image: res.body.img
  })
}

exports.data = {
    triggers: ['xkcd'],
    description: 'Shows xkcd image.'
}
