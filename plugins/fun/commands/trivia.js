let activeChannels = []
exports.output = async ({message}) => {
    
  const difficulty = Mike.utils.array.single([ 'easy', 'medium', 'hard' ])
  
  Mike.http.get(`https://opentdb.com/api.php?amount=1&type=boolean&difficulty=${difficulty}&encode=url3986`).then(async response => {

  if (activeChannels.includes(message.channel.id))  {
    return Mike.models.snap({
      object: message,
      message: `\`Game is already running on this channel.\``,
      color: '#f44262'
    })
  }

  if (!response.body) {
    return Mike.models.snap({
      object: message,
      message: `\`Error while connecting.\``,
      color: '#f44262'
    })
  }
  
  response = response.body.results[0]
  
  Mike.models.snap({
    object: message,
    message:`Trivia (${difficulty})
    
    **${decodeURIComponent(response.question)}**

    \`Category: ${decodeURIComponent(response.category)}\`

    __Reply with True/False within 20 seconds.__`

  })

  activeChannels.push(message.channel.id)

   const answer = await Mike.Collector.awaitMessage(message.channel.id, message.author.id, 20*1000)
    
   if (answer.content && answer.content.toLowerCase() == response.correct_answer.toLowerCase()) {
              
      Mike.models.snap({
        object: message,
        message: `\`You're right!\``
      })
      activeChannels.splice(activeChannels.indexOf(message.channel.id), 1)
          
    } else if (answer.content) {
      
      Mike.models.snap({
        object: message,
        message: `\`You're wrong.\``,
        color: '#f44262'
      })
      activeChannels.splice(activeChannels.indexOf(message.channel.id), 1)
          
    }
    
    if (!answer) {
       
      activeChannels.splice(activeChannels.indexOf(message.channel.id), 1)
      return Mike.models.snap({
        object: message,
        message: `\`Trivia was ended as nobody anwsered.\``
       
      })
    }
  }).catch(err => {
    if(err) return console.log(err)
  })
}

exports.data = {
    triggers: ['trivia'],
    description: 'Starts triva game.'
}
