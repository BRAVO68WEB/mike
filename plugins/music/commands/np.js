exports.output = async ({message, args}) => {
  
  const player = Mike.player.get(message.guild.id)
  
  if (!player || !player.playing) {
    return Mike.models.snap({
      object: message,
      message: '\`Music isn\'t playing!\`',
      color: '#f44262'
    })
  }
  
  if(!Mike.queue[message.guild.id]) new Mike.music.queue(message.guild.id)
  let queue = Mike.queue[message.guild.id]
  
  const song = queue.np
  
  if (args[0] == '--raw') {
    return message.channel.send(`\`\`\`js\n${JSON.stringify(song, null, "  ")}\n\`\`\``)
  }
  
  let time = ''
  
  const url = (song.url.startsWith("https://www.youtube.com/") ? `https://i.ytimg.com/vi/${song.url.replace("https://www.youtube.com/watch?v=", "")}/hqdefault.jpg` : ``)
  
  let t1 = await Mike.utils.time.formatLength(Date.now() - song.date, false)
  let t2 = await Mike.utils.time.formatLength(song.length)

  if(song.paused){
    time = `\`${t1} / ${t2} (paused)\``
  }else{
    time = `\`${t1} / ${t2}\``
  }

  const from = `\`Requested by ${song.requester}\``

  Mike.models.snap({
    object: message,
    message: `**[${song.title}](${song.url})**

              ${time}

              ${from}`,
    thumbnail: url
  })
}

exports.data = {
  triggers: ['np','nowplaying'],
  description: 'Shows current track info.',
  usage: [
    '{prefix}{command} [--raw]',
  ],
}
