const { Linter } = require('eslint');
const linter = new Linter();

const config = {
	"extends": "eslint:recommended",
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"env": {
		"es6": true,
		"node": true
	},
	"rules": {
		"no-console": 0
	}
}

module.exports = (message, lang) => {
  let code
  if (lang == `js`) code = message.content.substring(6).slice(0, -4)
  if (lang == `javascript`) code = message.content.substring(14).slice(0, -4)
  if (lang == `json`) code = message.content.substring(8).slice(0, -4)
  if (lang == `js` || lang == `javascript`) {
    const errors = linter.verify(code, config);
    if (!errors.length) {
      return message.react(Mike.emojis.get("568830907666923525")).catch(() => {})
    }
    const errorMap = Mike.utils.array.trimArray(errors.map(err => `\`[${err.line}:${err.column}] ${err.message}\``));
    message.react(Mike.emojis.get("568830953938616330")).catch(() => {})
    return Mike.exec.snap(message,`${errorMap.join('\n')}`, false, null, null,`You can disable code checking in settings.`).catch(() => {});
  } else if (lang == `json`) {
    try {
      JSON.parse(code)
      return message.react(Mike.emojis.get("568830907666923525")).catch(() => {})
    } catch (err) {
      message.react(Mike.emojis.get("568830953938616330")).catch(() => {})
      Mike.exec.snap(message, `${err.name}: ${err.message}`, true, null, null,`You can disable code checking in settings.`).catch(() => {})
    }
  }
}
