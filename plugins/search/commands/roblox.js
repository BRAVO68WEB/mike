exports.output = async ({message, args}) => {
  Mike.http.get('https://api.roblox.com/users/get-by-username')
           .query({
             username: encodeURIComponent(args[0])
           })
           .then(async response => {
              const user = response.body
              if(typeof user.Username == 'undefined') {
                return Mike.models.snap({
                  object: message,
                  message: '\`Player not found.\`',
                  color: '#f44262'
                })
              }
              return Mike.models.mult({
                object: message,
                fields: [
                  ['Status', user.IsOnline ? 'Online' : 'Offline', true],
                  ['Username', user.Username, true],
                  ['User ID', user.Id, true],
                ]
              })
          }).catch(error => {
              return require('../../../handlers/error')(message, error)
          })
}

exports.data = {
  triggers: ['roblox'],
  description: 'Shows your roblox stats.',
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
