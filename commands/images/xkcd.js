const snek = require('snekfetch');

exports.output = async ({message}) => {
    const max = await snek.get('https://xkcd.com/info.0.json')
    const res = await snek.get(`https://xkcd.com/${Math.floor(Math.random() * max.body.num + 1)}/info.0.json`)
    Mike.exec.link(message,res.body.img, res.body.alt)
}
exports.data = {
    triggers: ['xkcd'],
    description: 'Shows random xkcd image.'
}
