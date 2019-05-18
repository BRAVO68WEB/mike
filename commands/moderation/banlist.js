exports.output = async ({message, args}) => {
    let bannedUsers = await message.guild.fetchBans(true);

    if (!bannedUsers.size) {
      return Mike.exec.error(message, `No one has been banned.`)
    }



  let noOfPages = bannedUsers.size / 10;
  let i = (parseInt(args) > 0 && parseInt(args) < noOfPages + 1) ? parseInt(args) : 1;
  i = i - 1;
  let bannedUsersList = [];
  for (let bannedUser of bannedUsers.values()) {
    bannedUsersList.push(
      [
        `${bannedUser.username}#${bannedUser.discriminator} (${bannedUser.id})`,
        bannedUser.reason || 'No reason given',
        false
      ]
    );
  }
  bannedUsersList = bannedUsersList.slice(i * 10, (i * 10) + 10);
  Mike.exec.mult(message, bannedUsersList, `Page ${i + 1} of ${noOfPages > parseInt(noOfPages) ? parseInt(noOfPages) + 1 : parseInt(noOfPages)}`,null,null,null,`Bans: ${bannedUsers.size}`)
}
exports.data = {
    triggers: ['banlist','bans'],
    description: 'Lists all the banned users.',
    usage: [
        '{prefix}{command}'
    ],
    userPerms: [
        "BAN_MEMBERS"
    ],
    botPerms: [
        "BAN_MEMBERS"
    ]

}
