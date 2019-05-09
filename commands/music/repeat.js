exports.output = async ({message}) => {
    const player = Mike.player.get(message.guild.id);
    if (!player || !player.playing) {
        return Mike.exec.error(message, 'Music isn\'t playing!')
    }
    if(!Mike.queue[message.guild.id]) new Mike.music.queue(message.guild.id);
    let queue = Mike.queue[message.guild.id];
    if(queue.repeat) {
        queue.repeat = false;
        return Mike.exec.snap(message,`This song will be not repeated`)
    } else {
        queue.repeat = true;
        return Mike.exec.snap(message,`This song will be repeated.`)
    }
};

exports.data = {
    triggers: ['repeat'],
    description: 'Repeats current track.',
    voice: true
}
