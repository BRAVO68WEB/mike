exports.output = async ({message, args}) => {
  const voiceChannel = message.member.voiceChannel
  let track = args.join(" ")
  let ok = false
  await Mike.music.player.getSong(track).then(async s => {
      if(ok) return
      if(s.loadType == "NO_MATCHES") {
        let found = false
        await Mike.music.player.getSong(`ytsearch:${track}`).then(async songs => {
          songs.tracks.forEach(async song => {
            if(found) return
            found = true
            await play(song)
          })
        })
        if(!found) {
          return Mike.models.snap({
            object: message,
            message: '\`Nothing found.\`',
            color: '#f44262'
          })
        }
      } else if (s.loadType == "PLAYLIST_LOADED") {
        if(!Mike.queue[message.guild.id]) new Mike.music.queue(message.guild.id)
        let queue = Mike.queue[message.guild.id]
        let count = 0
        s.tracks.forEach(async song => {
          count++
          let player = await Mike.player.get(message.guild.id)
          if (!player) player = await Mike.player.join({
                  guild: message.guild.id,
                  channel: voiceChannel.id,
                  host: Mike.lavalink.host
              }, { selfdeaf: true })
              queue.songs.push(
                {
                  title: song.info.title.replace(/`/g, "'"),
                  channel: song.info.author,
                  length: song.info.length,
                  requester: message.author.tag,
                  url: song.info.uri,
                  track: song.track
                }
              )
          })

          Mike.models.snap({
            object: message,
            message: `\`Loaded ${count} songs.\``,
          })

          setTimeout(async () => {
            let player = await Mike.player.get(message.guild.id)
            if(!player.playing) {
              let song = queue.songs.shift();
              if(!song) return;
              Mike.music.player.play(song ,message).then(async () => {
                Mike.models.snap({
                  object: message,
                  message: `Now playing: \`${song.title}\`
                            from:\`${song.channel}\``,
                  footer:`🔉 ${player.state.volume}% • Duration: ${await Mike.utils.time.formatLength(song.length) || 'N/A'} • Requester: ${message.author.tag}`
                })
              })
            }
          }, 300)
      } else {
              await play(s.tracks[0])
      }
      ok = true
  });

  function play(song) {
    let s = {
      title: song.info.title.replace(/`/g, "'"),
      channel: song.info.author,
      length: song.info.length,
      requester: message.author.tag,
      url: song.info.uri,
      track: song.track
    }
    Mike.music.player.play(s, message).then(async t => {
        let player = await Mike.player.get(message.guild.id)
        const url = (s.url.startsWith("https://www.youtube.com/") ? `https://i.ytimg.com/vi/${s.url.replace("https://www.youtube.com/watch?v=", "")}/hqdefault.jpg` : ``)
        if(t == "play") {
            Mike.models.snap({
              object: message,
              message: `Now playing: \`${s.title}\`
                        from:\`${s.channel}\``,
              thumbnail: url,
              footer:`🔉 ${player.state.volume}% • Duration: ${await Mike.utils.time.formatLength(s.length) || 'N/A'} • Requester: ${message.author.tag}`
            })
        } else {
          Mike.models.snap({
            object: message,
            message: `Added to queue:: \`${s.title}\`
                      from:\`${s.channel}\``,
            thumbnail: url,
            footer:`Position: ${Mike.queue[message.guild.id].songs.length} • Duration: ${await Mike.utils.time.formatLength(s.length) || 'N/A'} • Requester: ${message.author.tag}`

          })
        }
    })
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
      'type':'text',
      'name':'song'
    }
  ]
}
