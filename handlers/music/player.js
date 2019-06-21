
const qc = require("./queue")

const play = async (song, message) => {
    return new Promise(async (resolve, reject) => {
        if(!Mike.queue[message.guild.id]) new qc(message.guild.id, Mike)
        let queue = Mike.queue[message.guild.id]
        let player = await Mike.player.get(message.guild.id)
        if (!player) player = await Mike.player.join({
            guild: message.guild.id,
            channel: message.member.voiceChannel.id,
            host: Mike.lavalink.host
        }, { selfdeaf: true })
        queue.channel = message.channel.id
        if(player.playing) {
            queue.songs.push(song)
            resolve("queue")
        } else {
            player.play(song.track)
            Object.assign(song, {date: Date.now()})
            queue.np = song
            resolve("play")
        }

        player.once("end", async data => {
            if(queue.loop) {
                let song = queue.np
                song.date = Date.now()
                song.requester = "Loop"
                play(song, message)
                return
            }
            if(queue.repeat) {
                queue.repeat = false
                let song = queue.np
                song.date = Date.now()
                song.requester = "Loop"
                play(song, message)
                return
            }
            let next = queue.songs.shift()
            if(next == null) {
                return
            } else {
                setTimeout(() => {
                    play(next, message)
                }, 400)
                let player = await Mike.player.get(message.guild.id)
                const url = (next.url.startsWith("https://www.youtube.com/") ? `https://i.ytimg.com/vi/${next.url.replace("https://www.youtube.com/watch?v=", "")}/hqdefault.jpg` : ``)
                Mike.models.snap({
                  object: message,
                  message: `Now playing: \`${next.title}\`
                            from:\`${next.channel}\``,
                  thumbnail: url,
                  footer:`🔉 ${player.state.volume}% • Duration: ${await Mike.utils.time.formatLength(next.length) || 'N/A'} • Requester: ${message.author.tag}`
                })
            }
            return
        })
    })
}

const getSong = async string => {
    return new Promise(async (resolve, reject) => {
        const res = await Mike.http.get(`http://${Mike.lavalink.host}:${Mike.lavalink.port}/loadtracks?identifier=${encodeURIComponent(string)}`)
        .set("Authorization", Mike.lavalink.password)
        .catch(err => {
            console.error(err)
            return null
        })
        if (!res) throw "There was an error, try again"
        resolve(res.body)
    })
}

module.exports.play = play
module.exports.getSong = getSong
