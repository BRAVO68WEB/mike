const imageType = require('image-type')
const { Attachment } = require('discord.js')

exports.output = async ({message, args}) => {
  Mike.http.get(`https://www.minecraftskinstealer.com/achievement/a.php?i=13&h=Achievement%20unlocked&t=${args.join(" ")}`)
           .then(async response => {
              const type = imageType(response.body)
              const file = new Attachment(response.body, `file.${type ? type.ext : 'png'}`)
              Mike.models.snap({
                object: message,
                file: file,
                message:'',
                image: `attachment://file.${type ? type.ext : 'png'}`,
              })
            })
}
exports.data = {
  triggers: ['achievement'],
  description: 'Generate minecraft achievement.',
  usage: [
    '{prefix}{command} <text>'
  ],
  args: [
    {
      'type':'any',
      'name':'text'
    }
  ]
}
