exports.output = async ({message}) => {
    message.channel.send(`:regional_indicator_f:`).then(m => {
        m.react('🇫');
    })
}
exports.data = {
    triggers: ['respect'],
    description: 'Presses F to pay respect.'
}
