exports.output = async ({message, args}) => {
const roblox = require("noblox.js")
roblox.getIdFromUsername(args.join(" ")).then(id => { // gets user id for the specific part of the embed
  if (id) {
    roblox.getPlayerInfo(parseInt(id)).then(function(info) {
       return Mike.models.mult({
         object: message,
         fields: [
           ['Status', info.status || "None" ,true],
           ['Username', info.username, true],
           ['User ID', id, true],
           ['Blurb', info.blurb || "Nothing",true],
           ['Account Age', info.age + ' days',true],
           ['Link to account', `[Click](https://roblox.com/users/${id}/profile)`,true]
         ],
         thumbnail: `https://www.roblox.com/bust-thumbnail/image?userId=${id}&width=420&height=420&format=png`
       })
     }).catch(error => {
       return require('../../../handlers/error')(message, error)
     })
    }
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
