module.exports = async (message, error) => {
  const code = Math.floor(1000 + Math.random() * 9000)
  Mike.models.snap({
    object: message,
    message: `**Ooops! Something went wrong!**

              This shouldn't happend,
              error has been sent to developer with code **#${code}**

              If you can, please report it here too:
              ${Mike.links.guild}

              ||\`\`\`${error.message}\`\`\`||

              `,
    color: '#f44262'
  })
}
