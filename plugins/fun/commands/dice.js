exports.output = async ({message}) => {
  Mike.models.mult({
    object: message,
    fields: [
      ['Rolled', Math.floor((Math.random()* 6) + 1), true],
    ],
    thumbnail: 'https://i.imgur.com/7e4iOYA.gif',
  })
}

exports.data = {
  triggers: ['dice', 'd6'],
  description: 'Flips the coin.'
}
