exports.output = async ({message}) => {
  const api = await Mike.http.get('https://api.imgflip.com/get_memes')
  const meme = Mike.utils.array.single(api.body.data.memes)

  Mike.models.snap({
    object: message,
    message: meme.name,
    image: meme.url
  })
}

exports.data = {
    triggers: ['memetemplate'],
    description: 'Shows meme template image.'
}
