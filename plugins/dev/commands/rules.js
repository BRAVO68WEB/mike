exports.output = async ({message, args}) => {
  const rules = `
  **Server Rules**

  **•** Do not use bots outside of <#518788823178805259>.
  **•** Do not spam, advertise anything.
  **•** Do not attack or harass anyone.
  **•** Do not post NSFW content.
  **•** Do not message <@214858075650260992> unless he has told you that you can.
  **•** Do not mention users without very good reason.
  **•** Do not use @everyone or @here.


  \u200B
`


  Mike.models.snap({
    object: message,
    message: rules,
    footer: `Updated: ${new Date().getDate()}/${new Date().getMonth()}/${new Date().getFullYear()}`
  })

  message.delete()
}


exports.data = {
  triggers: ['rules'],
  description: 'Sends rules to channel.',
  developer: true,
}
