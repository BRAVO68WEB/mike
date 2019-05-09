const snek = require('snekfetch');

exports.output = async ({message}) => {
    const api = await snek.get('https://api.imgflip.com/get_memes')
    const meme = Mike.utils.array.single(api.body.data.memes)
    Mike.exec.link(message, meme.url, meme.name)
}
exports.data = {
    triggers: ['memetemplate'],
    description: 'Shows random meme template.'
}
