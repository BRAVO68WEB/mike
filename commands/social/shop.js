exports.output = async ({message}) => {
    let content = ''
    Mike.items.forEach(element => {
        content += `${element.emoji} - _${element.worth}$_ - ${element.category}\n\`ID: ${element.name} | ${element.description}\`\n`
    });
    Mike.exec.snap(message, content, false)
}
exports.data = {
    triggers: ['shop'],
    description: 'Shows shop content.'
}
