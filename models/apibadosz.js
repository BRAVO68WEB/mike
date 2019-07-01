const imageType = require('image-type')
const { Attachment } = require('discord.js')
module.exports = async (data) => {

  data = await Object.assign({
      object: null,
      endpoint: null,
      type: 'image',
      output: null,
      title: '',
      color: Mike.color,
      footer: ''
  }, data)

  Mike.http.get(`http://api.badosz.com/${data.endpoint}`)
           .set(
             {
               Authorization: Mike.tokens.badosz
             }
            )
            .then(async response => {
                if (data.type == 'text') {
                  Mike.models.snap({
                    object: data.object,
                    message: `\`response.body[output]\``,
                    footer: `api.badosz.com`
                  })
                } else if (data.type == "image") {
                    const type = imageType(response.body)
                    const file = new Attachment(response.body, `file.${type ? type.ext : 'png'}`)
                    Mike.models.snap({
                      object: data.object,
                      message: data.title,
                      file: file,
                      image: `attachment://file.${type ? type.ext : 'png'}`,
                      footer: `api.badosz.com • Invoked by ${data.object.author.id}`
                    })
                }
            }).catch(error => {
              return require('../handlers/error')(data.object, error)
            })
}
