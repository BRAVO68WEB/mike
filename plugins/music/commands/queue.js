exports.output = async ({message}) => {
    if(!Mike.queue[message.guild.id]) new Mike.music.queue(message.guild.id, client)
    let queue = Mike.queue[message.guild.id]
    const player = Mike.player.get(message.guild.id)

    if (!player) {
      return Mike.models.snap({
        object: message,
        message: '\`Music isn\'t playing!\`',
        color: '#f44262'
      })
    }

    if(queue.songs.length == 0) {
      return Mike.models.snap({
        object: message,
        message: '\`Queue is empty!\`',
        color: '#f44262'
      })
    }

    let list = ``
    let numberOfTracks = 0
    let totaltime = 0
    queue.songs.forEach((song, i) => {
        numberOfTracks  += 1
        totaltime += song.length
        if (i < 10) {
            list += `\`${i+1}.\`[**${song.title.substring(0, 50)}**](${song.url})\n\`\t[${formatLength(song.length)} | ${song.requester}]\`\n`
        }
    })
    list = `**${numberOfTracks} Tracks | ${formatLength(totaltime)}**\n\n` + list

    return Mike.models.snap({
      object: message,
      message: list,
    })

    function formatLength(ms, replace = true) {
        var h = Math.floor(ms / 1000 / 60 / 60)
        var min = Math.floor(ms / 1000 / 60 - h * 60)
        var sec = Math.floor(ms / 1000 - min * 60 - h * 60 * 60)

        var uh = false
        if (!h == 0) {uh = true; if(h <= 9) {h = "0" + h;}}
        if (min <= 9) min = "0" + min
        if (sec <= 9) sec = "0" + sec
        var time = ""
        if(uh) {if(h >= 200) {time = "LIVE";} else {time = `${h}:${min}:${sec}`;}} else {time = `${min}:${sec}`;}
        if(replace) {
            if(time == "00:00") return "LIVE"
        }
        return time
    }
}

exports.data = {
    triggers: ['queue','q'],
    description: 'Shows server queue.',
    voice: true
}
