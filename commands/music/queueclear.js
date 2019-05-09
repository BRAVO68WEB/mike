exports.output = async ({message}) => {
    if(!Mike.queue[message.guild.id]) new Mike.music.queue(message.guild.id);
    let queue = Mike.queue[message.guild.id];
    queue.songs = [];
    return Mike.exec.snap(message,`Queue cleared.`)
};

exports.data = {
    triggers: ['queueclear'],
    description: 'Clears queue.',
    voice: true
}
