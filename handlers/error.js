module.exports = async (message, error) => {
  const code = Math.floor(1000 + Math.random() * 9000)
  Mike.models.snap({
    object: message,
    message: `**Ooops! Something went wrong!**

              This shouldn't have happend,
              The error has been sent the to developer with code **#${code}**

              If possible, please report it here too:
              ${Mike.links.guild}

              ||\`\`\`${error.message}\`\`\`||

              `,
    color: '#f44262'
  })
}
