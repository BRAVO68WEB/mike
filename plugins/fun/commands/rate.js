exports.output = async ({message, args}) => {
  const r3 = Math.floor((Math.random()* 10) + 1);
  let r2=".";
  const member = message.mentions.members.first() || args.join(" ");
  let r1 = ".";
  if (r3 == 1) {r2 = ":eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star:"}
  if (r3 == 2) {r2 = ":eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star:"}
  if (r3 == 3) {r2 = ":eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star:"}
  if (r3 == 4) {r2 = ":eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star:"}
  if (r3 == 5) {r2 = ":eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star:"}
  if (r3 == 6) {r2 = ":eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star:"}
  if (r3 == 7) {r2 = ":eight_pointed_black_star::eight_pointed_black_star::eight_pointed_black_star:"}
  if (r3 == 8) {r2 = ":eight_pointed_black_star::eight_pointed_black_star:"}
  if (r3 == 9) {r2 = ":eight_pointed_black_star:"}
  for (var i=0; i<=r3; i++)
  {
    r1 = ":star:".repeat(r3)
  }
    Mike.models.snap({
      object: message,
      message: `${Mike.customEmojis.hype} **${member}** rate\n${r1}${r2}`,
    })
  }
  exports.data = {
    triggers: ['rate'],
    description: 'None',
    usage: [
      '{prefix}{command} <text>'
    ],
    args: [
      {
        'type':'any',
        'name':'text'
      }
    ]
  }
