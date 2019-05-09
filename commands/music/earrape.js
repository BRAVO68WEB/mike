exports.output = async ({message}) => {
    const player = Mike.player.get(message.guild.id);
    if (!player) {
        return Mike.exec.error(message, 'Music isn\'t playing!')
    }

    await player.volume(1000000);
    return Mike.exec.snap(message, `Volume changed to earrape.`)
};

exports.data = {
    triggers: ['earrape'],
    description: 'Changes volume of current track to earrape..',
    voice: true
}
