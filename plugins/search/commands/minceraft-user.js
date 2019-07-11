const B64 = require('Base64')

exports.output = async ({message, args}) => {
  Mike.http.get(`https://api.mojang.com/users/profiles/minecraft/${args.join(" ")}`)
           .then(async response => {
              const user = response.body
              let AcUsername = user.name
              if(user.name == undefined) {
                return Mike.models.snap({
                  object: message,
                  message: '\`User doesn\'t exist.\`',
                  color: '#f44262'
                })
              }
              let AcID = user.id
              Mike.http.get(`https://api.mojang.com/user/profiles/${AcID}/names`)
                       .then(async response => {
                          const Names = response.body
                          let history = ``

                          Names.forEach(name => {
                            history += `${name.name} ${name.changedToAt ? `*(since ${new Date(name.changedToAt).toLocaleDateString("en-US")})*` : ``}\n`
                          })
                          Mike.models.snap({
                            object: message,
                            message: `**Username: **${AcUsername}
                                      **ID: **${AcID}

                                      **Username history:**
                                      ${history}`,
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
