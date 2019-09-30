exports.output = async ({message, args}) => {
  const user = await Mike.utils.users.search(message, args[0])

  const source = user.displayAvatarURL
  const png = source.replace('.gif', '.png')
  const webp = png.replace('.png', '.webp')
  const jpg = png.replace('.png', '.jpg')

  Mike.models.mult({
    object: message,
    description: `${user.tag} (${user.id})\n[source](${source}) | [png](${png}) | [webp](${webp}) | [jpg](${jpg})`, 
    image: source,
  })

}

exports.data = {
  triggers: ['avatar', 'av'],
  description: 'Shows user\'s avatar',
  usage: [
      '{prefix}{command} [mention]',
      '{prefix}{command} [id]',
      '{prefix}{command} [name] '
  ]
}
