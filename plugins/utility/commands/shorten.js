const { get } = require("snekfetch");


exports.output = async ({message, args}) => {
  const link = args.slice(0).join(' ')
  let match = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/i.exec(link);
  if(!match) return Mike.exec.error(message, "Provide a valid link.")
  const data = await get(`https://is.gd/create.php?format=json&url=${encodeURIComponent(link)}`).catch(e => {
      Error.captureStackTrace(e);
      throw Mike.models.snap({
        object: message,
        message: `\`Try again later\``,
        color: '#f44262'
       })
  });
  return Mike.models.snap({
    object: message,
    message: `${JSON.parse(data.text).shorturl}`
  })
}
exports.data = {
    triggers: ['shorten'],
    description: 'Shorts link.',
    usage: [
        '{prefix}{command} <link>',
    ],
    args: [
        {
            'type':'text',
            'name':'link'
        }
    ]
}
