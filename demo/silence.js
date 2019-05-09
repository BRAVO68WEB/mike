exports.output = async ({message, args}) => {
    const player = Mike.player.get(message.guild.id);
    if (!player.playing || !player) {
        return Mike.exec.error(message, 'Music isn\'t playing!')
    }
    if(!Mike.queue[message.guild.id]) new Mike.music.queue(message.guild.id, client);
    let queue = Mike.queue[message.guild.id];
    if(!queue.np.paused) queue.pause();
    await player.pause(true);
    return Mike.exec.snap(message,`Muted for ${args[0]} seconds.`)
    setTimeout(() => {
      player.pause(false)
      queue.resume();
    }, parseInt(args[0]) * 1000);
};

exports.data = {
    triggers: ['silence'],
    description: 'Silence bot for given time.',
    voice: true,
    usage: [
        '{prefix}{command} <seconds>'
    ],
    args: [
        {
            'type':'int',
            'name':'seconds'
        }
    ]
}
