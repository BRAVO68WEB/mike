const snek = require('snekfetch');

exports.output = async ({message, args}) => {
    snek.get(`https://api.urbandictionary.com/v0/define?term=${encodeURIComponent(args.join(' '))}`).then(async response => {
        const urban = response.body.list[0];
        if(!urban) {
           return Mike.exec.error(message, 'Word was not found!')
        }
        return Mike.exec.snap(message,`**Definiton**: \n\`${urban.definition || '-'}\`\n**Example: **\n\`${urban.example || '-'}\``, false)
    }).catch(err => {
        if(err) return console.log(err);
    });
}
exports.data = {
    triggers: ['urban'],
    description: 'Searches for word in Urban Dictionary.',
    nsfw: true,
    usage: [
        '{prefix}{command} <word>'
    ],
    args: [
        {
            type:"any",
            name:"word"
        }
    ]


}
