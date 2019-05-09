exports.output = async ({message}) => {
    Array.prototype.get = function(index) {
      return this[index < 0 ? this.length + index : index];
    };

    Array.prototype.tail = function() {
      return this.get(-1);
    };
    Array.prototype.head = function() {
      return this.get(0);
    };
    if (!message.guild.activities || !message.guild.activities.songs) {
      return Mike.exec.error(message, `Not enough data. Wait a while.`)

    }
    let songStats = `\`\`\`ldif\n`;
    let topPlayedSongs = Object.entries(message.guild.activities.songs);
    topPlayedSongs = topPlayedSongs.sort((a, b) => b.tail().length - a.tail().length);
    topPlayedSongs = topPlayedSongs.slice(0, 9);
    for (let song of topPlayedSongs) {
      songStats += `${song.head()} : ${song.tail().length} listener${song.tail().length == 1 ? '' : 's'}\n`
    }
    songStats += `\`\`\``
    message.channel.send(songStats)
}
exports.data = {
    triggers: ['topsongs'],
    description: 'Shows top songs in your guild.'
}
