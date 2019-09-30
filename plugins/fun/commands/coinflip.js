exports.output = async ({message}) => {
  const outcomes = [
      'tails',
      'heads',
  ]
  Mike.models.mult({
    object: message,
    fields: [
      ['Flipped', Mike.utils.array.single(outcomes),true]
    ],
    thumbnail: 'https://i.imgur.com/6qJ4yaX.gif',
  })
}
exports.data = {
  triggers: ['flipcoin','coinflip'],
  description: 'Flips the coin.'
}
