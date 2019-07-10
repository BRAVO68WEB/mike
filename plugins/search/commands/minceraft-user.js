exports.output = async ({message, args}) => {
  const B64 = require('Base64')

  Mike.http.get(`https://api.mojang.com/users/profiles/minecraft/${args.join(" ")}`)
           .then(async response => {
              const user = response.body
              let AcUsername = user.name
              console.log(AcUsername)
              if(user.name == undefined) return Mike.models.snap({
                  object: message,
                  message: '\`User doesn\'t exist.\`',
                  color: '#f44262'
              })
              let AcID = user.id
              Mike.http.get(`https://api.mojang.com/user/profiles/${AcID}/names`)
              .then(async response => {
                let Names = response.body
                let Name
                let len = Names.length-1
                for(let i=0; i<len+1;i++){
                  Name+=Names[i].name
                  Name+="\n"
                }

                Mike.models.snap({
                  object: message,
                  message: `**Minecraft Userinfo**\n\nUsername: **${AcUsername}**\nID: **${AcID}**\n\n**${AcUsername}'s** usernames history:\n${Name}`,
                })
              })

            })
}

exports.data = {
  triggers: ['minecraft-user'],
  description: 'Shows minecraft user info.',
  usage: [
    '{prefix}{command} <username>',
  ],
  args: [
    {
      'type':'text',
      'name':'username'
    }
  ]
}
