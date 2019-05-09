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
    if (!message.guild.activities || !message.guild.activities.games) {
      return Mike.exec.error(message, `Not enough data. Wait a while.`)

    }
    let gameStats = `\`\`\`ldif\n`;
    let topPlayedGames = Object.entries(message.guild.activities.games);
    topPlayedGames = topPlayedGames.sort((a, b) => b.tail().length - a.tail().length);
    topPlayedGames = topPlayedGames.slice(0, 9);
    for (let game of topPlayedGames) {
      gameStats += `${game.head()} : ${game.tail().length} player${game.tail().length == 1 ? '' : 's'}\n`
    }
    gameStats += `\`\`\``
    message.channel.send(gameStats)
}
exports.data = {
    triggers: ['topgames'],
    description: 'Shows top games in your guild.'
}
