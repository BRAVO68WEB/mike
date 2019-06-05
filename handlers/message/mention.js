module.exports = async (message) => {
  Mike.models.snap({
    object: message,
    message: `Hi I\'m ${Mike.user.username},
              Type \`${Mike.prefix}help\` to find out more about my abilities!

              If you need more specific help join here:

              ${Mike.links.guild}`,
    thumbnail: Mike.user.displayAvatarURL
  })
}
