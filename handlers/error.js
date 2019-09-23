module.exports = async (message, error) => {
  const code = Math.floor(1000 + Math.random() * 9000)
  Mike.models.snap({
    object: message,
    message: `**Ooops! Something went wrong!**

              This shouldn't have happend,
              The error has been sent to the developer with code **#${code}**

              If possible, please report it here too:
              ${Mike.links.guild}`,
    color: '#f44262'
  })

  Mike.roles.developers.forEach(id => {
    Mike.users.get(id).send(`
Error Raport
\`[USER ID]:\` ${message.author.id}
\`[SERVER ID]:\` ${message.guild.id}
\`[COMMAND]:\` ${message.content}

\`[ERROR STACK]:\`
${error.stack}`)
  })
}
