
const qc = require("./queue");
const snek = require("snekfetch");

const play = async (song, Mike, message) => {
    return new Promise(async (resolve, reject) => {
        if(!Mike.queue[message.guild.id]) new qc(message.guild.id, Mike);
        let queue = Mike.queue[message.guild.id];
        let player = await Mike.player.get(message.guild.id);
        if (!player) player = await Mike.player.join({
            guild: message.guild.id,
            channel: message.member.voiceChannel.id,
            host: Mike.config.lavalink.host
        }, { selfdeaf: true });
        queue.channel = message.channel.id;
        if(player.playing) {
            queue.songs.push(song);
            resolve("queue");
        } else {
            player.play(song.track);
            Object.assign(song, {date: Date.now()});
            queue.np = song;
            resolve("play");
        }

        player.once("end", data => {
            if(queue.loop) {
                let song = queue.np;
                song.date = Date.now();
                song.requester = "Loop";
                play(song, Mike, message);
                return;
            }
            if(queue.repeat) {
                queue.repeat = false
                let song = queue.np;
                song.date = Date.now();
                song.requester = "Loop";
                play(song, Mike, message);
                return;
            }
            let next = queue.songs.shift();
            if(next == null) {
                return;
            } else {
                setTimeout(() => {
                    play(next, Mike, message);
                }, 400);
            }
            return;
        });
    });
}

const getSong = async string => {
    return new Promise(async (resolve, reject) => {
        const res = await snek.get(`http://${Mike.config.lavalink.host}:${Mike.config.lavalink.port}/loadtracks?identifier=${encodeURIComponent(string)}`)
        .set("Authorization", Mike.config.lavalink.password)
        .catch(err => {
            console.error(err);
            return null;
        });
        if (!res) throw "There was an error, try again";
        resolve(res.body);
    });
}

module.exports.play = play;
module.exports.getSong = getSong;
