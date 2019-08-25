exports.output = async ({message, args}) => {
  const voiceChannel = message.member.voiceChannel
  let track = args.join(" ")

  let ok = false

  const spotify = await Mike.utils.regex.spotify(track)
  if (spotify) {
    const result = await Mike.utils.spotify.search(spotify[1])
    if (result) {
      track = `${result.artists[0].name} ${result.name}`
    } else {
      return Mike.models.snap({
        object: message,
        message: '\`Nothing found.\`',
        color: '#f44262'
      })
    }
  }

  await Mike.music.player.getSong(track).then(async search => {
      if (ok) return
      if (search.loadType == "NO_MATCHES") {

        if (Mike.cache.youtube.hasOwnProperty(track)) {

          await play(Mike.cache.youtube[track])

        } else {

          await Mike.music.player.getSong(`ytsearch: ${track}`).then(async songs => {

            if(songs.tracks.length == 0) {

              return Mike.models.snap({
                object: message,
                message: '\`Nothing found.\`',
                color: '#f44262'
              })

            }

            Mike.cache.youtube[track] = songs.tracks[0]
            await play(songs.tracks[0])

          })

        }

      } else if (search.loadType == "PLAYLIST_LOADED") {

          if (!Mike.queue[message.guild.id]) new Mike.music.queue(message.guild.id)
          let queue = Mike.queue[message.guild.id]
          let player = await Mike.player.get(message.guild.id)
          if (!player) {
            player = await Mike.player.join({
                                              guild: message.guild.id,
                                              channel: voiceChannel.id,
                                              host: Mike.lavalink.host
                                            }, { selfdeaf: true })
          }

          let mess = `**${search.tracks.length} Songs Queued**\n\`\`\`ini\n`
          search.tracks.forEach(async (song, i) => {

            queue.songs.push({
              title: song.info.title.replace(/`/g, "'"),
              channel: song.info.author,
              length: song.info.length,
              requester: message.author.tag,
              url: song.info.uri,
              track: song.track
            })

            i++
            if (i <= 20) {
              mess += `[${(i < 10 ? '0' : '') + i}] ${song.info.title.replace(/`/g, "'").substring(0, 40)}\n`
            }

          })

          if (search.tracks.length >= 20) mess += `and ${search.tracks.length-20} more...`

          mess += `\n\`\`\``

          Mike.models.snap({
            object: message,
            message: mess,
          })

          setTimeout(async () => {

            let player = await Mike.player.get(message.guild.id)
            if(!player.playing) {
              let song = queue.songs.shift()
              if(!song) return
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
              await play(search.tracks[0])
      }

      ok = true
  })

  function play(song) {

    if (!song) {
      return Mike.models.snap({
        object: message,
        message: '\`Nothing found.\`',
        color: '#f44262'
      })
    }

    let parsedSong = {
      title: song.info.title.replace(/`/g, "'"),
      channel: song.info.author,
      length: song.info.length,
      requester: message.author.tag,
      url: song.info.uri,
      track: song.track
    }

    Mike.music.player.play(parsedSong, message).then(async type => {
        let player = await Mike.player.get(message.guild.id)
        const url = (parsedSong.url.startsWith("https://www.youtube.com/") ? `https://i.ytimg.com/vi/${parsedSong.url.replace("https://www.youtube.com/watch?v=", "")}/hqdefault.jpg` : ``)
        if (type == "play") {
            Mike.models.snap({
              object: message,
              message: `Now playing: \`${parsedSong.title}\`
                        from:\`${parsedSong.channel}\``,
              thumbnail: url,
              footer:`🔉 ${player.state.volume}% • Duration: ${await Mike.utils.time.formatLength(parsedSong.length) || 'N/A'} • Requester: ${message.author.tag}`
            })
        } else {
          Mike.models.snap({
            object: message,
            message: `Queued: \`${parsedSong.title}\`
                      from:\`${parsedSong.channel}\``,
            thumbnail: url,
            footer:`Position: ${Mike.queue[message.guild.id].songs.length} • Duration: ${await Mike.utils.time.formatLength(parsedSong.length) || 'N/A'} • Requester: ${message.author.tag}`

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
