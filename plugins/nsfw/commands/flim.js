const nsfw = 'flim'.split('').reverse().join('')

exports.output = async ({message}) => {
  Mike.models.apibadosz({
    object: message,
    endpoint: nsfw
  })
}

exports.data = {
    triggers: [nsfw],
    description: `Shows random ${nsfw} image.`,
    nsfw: true
}
