const snek = require('snekfetch');

exports.output = async ({message}) => {
    const api = await snek.get('http://aws.random.cat/meow')
    Mike.exec.link(message, api.body.file, ``)
}
exports.data = {
    triggers: ['meow','cat'],
    description: 'Shows random cat image.'
}
