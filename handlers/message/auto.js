const reactions = {
  "f": ["🇫"],
  "jd": ["🇯","🇩"],
  "czokos": ["🔞"]
}

module.exports = async (message) => {
  if (reactions[message.content]) {
    try {
      reactions[message.content].forEach(reaction => {
        message.react(reaction)
      })
    } catch (e) {

    }
  }
}
