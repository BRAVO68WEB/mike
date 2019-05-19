exports.output = async ({message, args}) => {
    const vChannel = message.member.voiceChannel;
    let track = args.join(" ");
    let ok = false;
    await Mike.music.player.getSong(track).then(async s => {
        if(ok) return;
        if(s.loadType == "NO_MATCHES") {
            let zn = false;
            await Mike.music.player.getSong(`ytsearch:${track}`).then(async songs => {
                songs.tracks.forEach(async e => {
                    if(zn) return;
                    zn = true;
                    await play(e);
                });
            });
            if(!zn) return Mike.exec.error(message,'Nothing found.')
        } else if (s.loadType == "PLAYLIST_LOADED") {
            if(!Mike.queue[message.guild.id]) new Mike.music.queue(message.guild.id);
            let queue = Mike.queue[message.guild.id];
            let c = 0;
            s.tracks.forEach(async song => {
                c++;
                let p = await Mike.player.get(message.guild.id);
                if (!p) p = await Mike.player.join({
                    guild: message.guild.id,
                    channel: vChannel.id,
                    host: Mike.config.lavalink.host
                }, { selfdeaf: true });

                queue.songs.push({title: song.info.title.replace(/`/g, "'"), channel: song.info.author, length: song.info.length, requester: message.author.tag, url: song.info.uri, track: song.track});
            });

            Mike.exec.snap(message,`Loaded ${c} songs`)

            setTimeout(async () => {
                let p = await Mike.player.get(message.guild.id);
                if(p.playing) {} else {
                    let song = queue.songs.shift();
                    if(!song) return;
                    Mike.music.player.play(song, Mike ,message).then(async () => {
                        Mike.exec.snap(message, `Now playing: \`${song.title}\`\nfrom:\`${song.channel}\`\n[\`${await Mike.utils.time.formatLength(song.length)}\`] [${message.author}]`, false)
                    });
                }
            }, 300);
        } else {
                await play(s.tracks[0]);
        }
        ok = true;
    });

    function play(song) {
    let s = {title: song.info.title.replace(/`/g, "'"), channel: song.info.author, length: song.info.length, requester: message.author.tag, url: song.info.uri, track: song.track};
    Mike.music.player.play(s, Mike, message).then(async t => {
        let url = ''
        if(s.url.startsWith("https://www.youtube.com/")) {
            const id = s.url.replace("https://www.youtube.com/watch?v=", "");
            url = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`
        } else {
            url = null
        }
        if(t == "play") {
            Mike.exec.snap(message,`Now playing: \`${s.title}\`\nfrom: \`${s.channel}\`\n[\`${await Mike.utils.time.formatLength(s.length)}\`] [${message.author}]`,false, url)
        } else {
            Mike.exec.snap(message,`Added to queue: \`${s.title}\`\nfrom:\`${s.channel}\`\n[\`${await Mike.utils.time.formatLength(s.length)}\`] [${message.author}]\nPosition in queue:\`${Mike.queue[message.guild.id].songs.length}\``,false, url)
        }
    });

    }
}

exports.data = {
    triggers: ['play','p','>'],
    description: 'Plays music.',
    voice: true,
    usage: [
        '{prefix}{command} <title>',
        '{prefix}{command} <link>',
    ],
    args: [
        {
            'type':'any',
            'name':'title'
        }
    ]
}
