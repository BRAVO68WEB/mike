exports.link = async (text) => {
  const match = /(?:(?:https?|ftp|file):\/\/|www\.|ftp\.)(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[-A-Z0-9+&@#/%=~_|$?!:,.])*(?:\([-A-Z0-9+&@#/%=~_|$?!:,.]*\)|[A-Z0-9+&@#/%=~_|$])/i.exec(text)
  if (match) return true
  else return false
}

exports.id = async (text) => {
  const match =  /^([0-9]{15,21})$/i.exec(text)
  if (match) return true
  else return false
}

exports.webhook = async (text) => {
  const match = /discordapp.com\/api\/webhooks\/([^\/]+)\/([^\/]+)/i.exec(text)
  if (match) return true
  else return false
}

exports.spotify = async (text) => {
  const match = /https?:\/\/(?:open\.)?spotify\.com\/track\/([a-zA-Z0-9]{22})/i.exec(text)
  if (match) return match
  else return false
}
