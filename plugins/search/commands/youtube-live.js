exports.output = async ({message, args}) => {
  Mike.http.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${args.join(" ")}&type=video&eventType=live&key=${Mike.tokens.YouTubeAPIv3}`)
           .then(async response => {
              const Live = response.body
              const len = Live.items.length;
              if(len == 0) return Mike.models.snap({
                object: message,
                message: '\`This channel is not 🔴 Live.\`',
                color: '#f44262'
              })
              else{
                Mike.models.mult({
                  object: message,
                  fields: [
                    ['Live Title', Live.items[len-1].snippet.title, true],
                    ['Live description', Live.items[len-1].snippet.description, true],
                    ['Channel', Live.items[len-1].snippet.channelTitle,true],
                  ],
                  image: Live.items[len-1].snippet.thumbnails.high.url,
                })
              }

            }).catch(e => {
                Mike.models.snap({
                  object: message,
                  message: 'Invalid channel ID.',
                  color: '#f44262',
                  image: "https://i.imgur.com/TSG8qmU.png"
                })
            })
}

exports.data = {
  triggers: ['youtube-live'],
  description: 'Shows youtube live info.',
  usage: [
    '{prefix}{command} <ChannelID>',
  ],
  args: [
    {
      'type':'any',
      'name':'ChannelID'
    }
  ]
}
