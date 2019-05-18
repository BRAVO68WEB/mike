const snek = require('snekfetch');
const moment = require('moment');

exports.output = async ({message, args}) => {
    snek.get(`http://api.stackexchange.com/2.2/search/advanced`)
    .query({
					page: 1,
					pagesize: 1,
					order: 'asc',
					sort: 'relevance',
					answers: 1,
					q: args.join(" "),
					site: 'stackoverflow',
					key: Mike.config.tokens.stackoverflow
    }).then(async response => {
        let answer = response.body;
        if (!answer.items.length) {
            Mike.exec.error(message, 'Could not find any results.')
        } else {
            answer = answer.items[0];
            return Mike.exec.mult(message, [
                ['ID', answer.question_id, true],
                ['Asker', `[${answer.owner.display_name}](${answer.owner.link})`, true],
                ['Views', answer.view_count, true],
                ['Score', answer.score, true],
                ['Creation Date',  moment.utc(answer.creation_date * 1000).format('MM/DD/YYYY h:mm A'), true],
                ['Last Activity', moment.utc(answer.last_activity_date * 1000).format('MM/DD/YYYY h:mm A'), true]
            ], ``,`https://i.imgur.com/P2jAgE3.png`,null,null,`[${answer.title}](${answer.link})`)
        }
    }).catch(err => {
        if(err) return console.log(err);
    });
}

exports.data = {
    triggers: ['stackoverflow', 'stack'],
    description: 'Searches Stack Overflow for your query.',
    usage: [
        '{prefix}{command} <query>',
    ],
    args: [
        {
            'type':'any',
            'name':'query'
        }
    ]
}
