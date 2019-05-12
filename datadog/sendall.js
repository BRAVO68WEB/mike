module.exports = async () => {
  var stats = [
      {
        metric: "mike.events",
        points: Mike.stats.events.total
      },
      {
        metric: "mike.errors",
        points: Mike.stats.events.errors
      },
      {
        metric: "mike.voiceUpdates",
        points: Mike.stats.events.voiceUpdates
      },
      {
        metric: "mike.reactions",
        points: Mike.stats.events.reactions
      },
      {
        metric: "mike.messages",
        points: Mike.stats.messages.total
      },
      {
        metric: "mike.guilds",
        points: Mike.guilds.size
      },
      {
        metric: "mike.commands",
        points: Mike.stats.commands.total
      },
      {
        metric: "mike.commands",
        points: Mike.stats.commands.total
      },
      {
        metric: "mike.users",
        points: Mike.users.size
      },
      {
        metric: "mike.channels",
        points: Mike.channels.size
      },
      {
        metric: "mike.apilatency",
        points: Math.round(Mike.ping)
      },

  ];
  Mike.dog.metric.send_all(stats)

};
