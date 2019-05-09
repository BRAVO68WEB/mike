exports.output = async ({message}) => {
    const player = Mike.player.get(message.guild.id);
    if (!player || !player.playing) {
        return Mike.exec.error(message, 'Music isn\'t playing!')
    }
    if(!Mike.queue[message.guild.id]) new Mike.music.queue(message.guild.id)
    let queue = Mike.queue[message.guild.id];
    queue.loop = false;
    await player.stop();
    return Mike.exec.snap(message, 'Skipped.')
};

exports.data = {
    triggers: ['skip','s'],
    description: 'Skips current track.',
    voice: true,

}
