const snek = require('snekfetch');
let activeChannels = []

exports.output = async ({message}) => {
    difficulty = Mike.utils.array.single([ 'easy', 'medium', 'hard' ]);
    snek.get(`https://opentdb.com/api.php?amount=1&type=boolean&difficulty=${difficulty}&encode=url3986`).then(async response => {

        if (activeChannels.includes(message.channel.id))  {
            return Mike.exec.error(message, "Game is already running on this channel.")
          }

        if (!response.body) return Mike.exec.error(message, `Error while connecting.`)

        response = response.body.results[0]
        Mike.exec.snap(message,`Trivia (${difficulty})\n\n**${decodeURIComponent(response.question)}**\n\n\`Category: ${decodeURIComponent(response.category)}\`\n\n__Reply with True/False within 20 seconds.__`, false)

        activeChannels.push(message.channel.id);

        let validAnswers = [
            'true',
            'false'
         ];
        const answer = await Mike.Collector.awaitMessage(message.channel.id, message.author.id, 20*1000)

          if (answer.content.toLowerCase() == response.correct_answer.toLowerCase()) {
              Mike.exec.snap(message,"You're right!")
              activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
          } else {
              Mike.exec.snap(message,"You're wrong.")
              activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
          }
          if (!answer){
              activeChannels.splice(activeChannels.indexOf(message.channel.id), 1);
              return Mike.exec.error(message,"Trivia was ended as nobody anwsered.")
          }
        }).catch(err => {
            if(err) return console.log(err);
        });
}
exports.data = {
    triggers: ['trivia'],
    description: 'Starts triva game.'
}
