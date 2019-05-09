exports.output = async ({message}) => {
    const player = Mike.player.get(message.guild.id);
    if (!player.playing || !player) {
        return Mike.exec.error(message, 'Music isn\'t playing!')
    }
    if(!Mike.queue[message.guild.id]) new Mike.music.queue(message.guild.id, client);
    let queue = Mike.queue[message.guild.id];
    if(!queue.np.paused) queue.pause();
    await player.pause(true);
    return Mike.exec.snap(message,`Paused.`)
};

exports.data = {
    triggers: ['pause'],
    description: 'Pauses current track.',
    voice: true
}
