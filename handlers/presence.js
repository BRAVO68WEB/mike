module.exports = async () => {
  (function setPresence() {
    Mike.user.setPresence(
      { game:
        { type: 'WATCHING',
           name: `${Mike.prefix}help`
        },
        status: 'online'
      }
    )
    setTimeout(setPresence,120000)
  })()
}
