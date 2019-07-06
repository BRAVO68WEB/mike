exports.output = async ({message}) => {
  const outcomes = [
      'tails',
      'heads',
  ]
  Mike.models.mult({
    object: message,
    fields: [
      ['Flipped',Mike.utils.array.single(outcomes),true]
    ],
    thumbnail: "https:\//cdn.dribbble.com/users/58530/screenshots/2323771/coin-flip.gif",
  })
}
exports.data = {
  triggers: ['flipcoin','coinflip'],
  description: 'Flips the coin.'
}
