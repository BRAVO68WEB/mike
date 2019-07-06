exports.output = async ({message}) => {
  Mike.models.mult({
    object: message,
    fields: [
      ['Rolled',Math.floor((Math.random()* 6) + 1),true],
    ],
    thumbnail: "https://media.giphy.com/media/l4hLAf6Eo8DEcO5ZS/giphy.gif",
  })
}
exports.data = {
  triggers: ['dice', 'd6'],
  description: 'Flips the coin.'
}
