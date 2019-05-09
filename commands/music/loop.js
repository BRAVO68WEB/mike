exports.output = async ({message}) => {
    const player = Mike.player.get(message.guild.id);
    if (!player || !player.playing) {
        return Mike.exec.error(message, 'Music isn\'t playing!')
    }
    if(!Mike.queue[message.guild.id]) new Mike.music.queue(message.guild.id);
    let queue = Mike.queue[message.guild.id];
    if(queue.loop) {
        queue.loop = false;
        return Mike.exec.snap(message,`Loop disabled.`)
    } else {
        queue.loop = true;
        return Mike.exec.snap(message,`Loop enabled.`)
    }
};

exports.data = {
    triggers: ['loop'],
    description: 'Loops current track.',
    voice: true
}
