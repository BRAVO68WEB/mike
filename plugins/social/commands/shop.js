exports.output = async ({message}) => {
  let content = ''
  Mike.items.forEach(element => {
      content += `${element.emoji} - _${element.worth}$_ - ${element.category}\n\`ID: ${element.name} | ${element.description}\`\n`
  });
  return Mike.models.snap({
    object: message,
    message: content + '\nUse `buy` command to purchase item.'
  })
}
exports.data = {
  triggers: ['shop'],
  description: 'Shows shop content.'
}
