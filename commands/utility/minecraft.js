const snek = require('snekfetch');

exports.output = async ({message, args}) => {
    snek.get(`https://mcapi.us/server/status?ip=${args[0]}&port=${(args[1] ? args[1] : 25565)}`).then(async response => {
        const server = response.body;
        if (server.online) {
            return Mike.exec.mult(message, [
                ['Server status', 'Online', true],
                ['Version', server.server.name, true],
                ['Players online', `${server.players.now}/${server.players.max}`, true],
                ['MOTD', server.motd, true],
            ])

        } else {
            return Mike.exec.error(message, 'Server offline.')
        }
    }).catch(err => {
        if(err) return console.log(err);
    });
}

exports.data = {
    triggers: ['minecraft','mc'],
    description: 'Shows minecraft server info.',
    usage: [
        '{prefix}{command} <ip> [port]',
    ],
    args: [
        {
            'type':'any',
            'name':'text'
        }
    ]
}
