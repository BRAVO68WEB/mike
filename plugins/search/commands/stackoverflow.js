const moment = require('moment')

exports.output = async ({message, args}) => {
  Mike.http.get(`http://api.stackexchange.com/2.2/search/advanced`)
  .query({
		page: 1,
		pagesize: 1,
		order: 'asc',
		sort: 'relevance',
		answers: 1,
		q: args.join(" "),
		site: 'stackoverflow',
		key: Mike.tokens.stackoverflow
  }).then(async response => {
      let answer = response.body;
      if (!answer.items.length) {
        return Mike.models.snap({
          object: message,
          message: '\`Could not find any results.\`',
          color: '#f44262'
        })
      } else {
        answer = answer.items[0];
        return Mike.models.mult({
          object: message,
          description: `[${answer.title}](${answer.link})`,
          fields: [
            ['ID', answer.question_id, true],
            ['Asker', `[${answer.owner.display_name}](${answer.owner.link})`, true],
            ['Views', answer.view_count, true],
            ['Score', answer.score, true],
            ['Creation Date',  moment.utc(answer.creation_date * 1000).format('MM/DD/YYYY h:mm A'), true]
          ],
          thumbnail: `https://i.imgur.com/P2jAgE3.png`
        })
      }
  }).catch(error => {
      return require('../../../handlers/error')(message, error)
  })
}

exports.data = {
  triggers: ['stackoverflow', 'stack'],
  description: 'Searches Stack Overflow for your query.',
  usage: [
    '{prefix}{command} <query>',
  ],
  args: [
    {
      'type':'text',
      'name':'query'
    }
  ]
}
