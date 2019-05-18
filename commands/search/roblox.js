const snek = require('snekfetch');

exports.output = async ({message, args}) => {
    const username = encodeURIComponent(args[0]);
    snek.get('https://api.roblox.com/users/get-by-username?username=' + username).then(async response => {
        const user = response.body;
        if(typeof user.Username == 'undefined') {
            return Mike.exec.error(message, 'The username you provided was not found!')
        }
        return Mike.exec.mult(message, [
            ['Status', user.IsOnline ? 'Online' : 'Offline', true],
            ['Username', user.Username, true],
            ['User ID', user.Id, true],
        ])
    }).catch(err => {
        if(err) return console.log(err);
    });
}

exports.data = {
    triggers: ['roblox'],
    description: 'Shows your roblox stats.',
    usage: [
        '{prefix}{command} <username>',
    ],
    args: [
        {
            'type':'any',
            'name':'text'
        }
    ]
}
