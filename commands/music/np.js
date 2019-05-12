exports.output = async ({message, args}) => {
    const player = Mike.player.get(message.guild.id);
    if (!player || !player.playing) {
        return Mike.exec.error(message, 'Music isn\'t playing!')
    }
    if(!Mike.queue[message.guild.id]) new Mike.music.queue(message.guild.id);
    let queue = Mike.queue[message.guild.id];
    const song = queue.np;
    if (args[0] == '--raw') {
        return message.channel.send(`\`\`\`js\n${JSON.stringify(song, null, "  ")}\n\`\`\``)
    }
    let time = ''
    let url = ''
    if(song.url.startsWith("https://www.youtube.com/")) {
        const id = song.url.replace("https://www.youtube.com/watch?v=", "");
        url = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
    } else {
        url = null
    }

    let t1 = await Mike.utils.time.formatLength(Date.now() - song.date, false);
    let t2 = await Mike.utils.time.formatLength(song.length);

    if(song.paused){
        time = `\`${t1} / ${t2} (paused)\``
    }else{
        time = `\`${t1} / ${t2}\``
    }

    const from = `\`Requested by ${song.requester}\``

    return Mike.exec.snap(message,`**[${song.title}](${song.url})**\n\n${time}\n\n${from}`,false ,url)
};

exports.data = {
    triggers: ['np','nowplaying'],
    description: 'Shows current track info.',
    usage: [
        '{prefix}{command}',
        '{prefix}{command} --raw',
    ],
}
