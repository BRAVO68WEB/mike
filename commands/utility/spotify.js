const Discord = require('discord.js');
exports.output = async ({message, args}) => {
  const user = message.mentions.users.first();

  if (user.presence.game !== null && user.presence.game.type === 2 && user.presence.game.name === 'Spotify' && user.presence.game.assets !== null) {
      const trackIMG = user.presence.game.assets.largeImage ? `https://i.scdn.co/image/${user.presence.game.assets.largeImage.slice(8)}` : null;
      const trackURL = `https://open.spotify.com/track/${user.presence.game.syncID}`;
      const trackName = user.presence.game.details;
      const trackAuthor = user.presence.game.state;
      const trackAlbum = user.presence.game.assets.largeText;
      const embed = new Discord.RichEmbed()
          .setDescription(`Spotify Track Info`)
          .setColor(0x1ED760)
          .setThumbnail(trackIMG)
          .addField('Song Name', trackName, true)
          .addField('Album', trackAlbum, true)
          .addField('Author', trackAuthor, false)
          .addField('Listen to Track:', `[link](${trackURL})`, false)
      message.channel.send(embed);


  } else {
      return Mike.exec.error(message, "User isn't listening to Spotify!")
  }
}
exports.data = {
    triggers: ['spotify'],
    description: 'Checks spotify song details.',
    usage: [
        '{prefix}{command} <mention>',
    ],
    args: [
        {
            'type':'mention',
            'name':'mention'
        }
    ]
}
