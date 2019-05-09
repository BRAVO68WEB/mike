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

    let t1 = formatLength(Date.now() - song.date, false);
    let t2 = formatLength(song.length);

    if(song.paused){
        time = `\`${t1} / ${t2} (paused)\``
    }else{
        time = `\`${t1} / ${t2}\``
    }

    const from = `\`Requested by ${song.requester}\``

    return Mike.exec.snap(message,`**[${song.title}](${song.url})**\n\n${time}\n\n${from}`,false ,url)

    function formatLength(ms, replace = true) {
        var h = Math.floor(ms / 1000 / 60 / 60);
        var min = Math.floor(ms / 1000 / 60 - h * 60);
        var sec = Math.floor(ms / 1000 - min * 60 - h * 60 * 60);

        var uh = false;
        if (!h == 0) {uh = true; if(h <= 9) {h = "0" + h;}}
        if (min <= 9) min = "0" + min;
        if (sec <= 9) sec = "0" + sec;
        var time = "";
        if(uh) {if(h >= 200) {time = "LIVE";} else {time = `${h}:${min}:${sec}`;}} else {time = `${min}:${sec}`;}
        if(replace) {
            if(time == "00:00") return "LIVE";
        }
        return time;
    }
};

exports.data = {
    triggers: ['np','nowplaying'],
    description: 'Shows current track info.',
    usage: [
        '{prefix}{command}',
        '{prefix}{command} --raw',
    ],
}
