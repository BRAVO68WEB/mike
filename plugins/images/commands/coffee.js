exports.output = async ({message, args}) => {
  Mike.http.get(`https://coffee.alexflipnote.xyz/random.json`)
           .then(async response => {
              let res = response.body
              let file = res.file
              Mike.models.snap({
                object: message,
                message: "☕ Your coffee is ready",
                image: file,
              })
           })
}

exports.data = {
  triggers: ['coffee'],
  description: '☕',
}
