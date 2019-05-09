exports.output = async ({message}) => {
    const player = Mike.player.get(message.guild.id);
    if (!player) {
        return Mike.exec.error(message, 'Music isn\'t playing!')
    }
    if(!Mike.queue[message.guild.id]) new Mike.music.queue(message.guild.id, client);
    let queue = Mike.queue[message.guild.id];
    queue.songs = await Mike.utils.array.shuffle(queue.songs)

    return Mike.exec.snap(message,`Shuffled.`)
};

exports.data = {
    triggers: ['shuffle'],
    description: 'Shuffles queue.',
    voice: true
}
