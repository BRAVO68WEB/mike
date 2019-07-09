exports.output = async ({message, args}) => {
  var odp = [
	  	"rock","paper","scissors"
	];
  let choice2 = args.join(" ")
  let choice
  let win
  if(choice2 == "paper") choice = "paper"
  else if(choice2 == "rock") choice = "rock"
  else if(choice2 == "scissors") choice = "scissors"
  else return Mike.models.snap({
    object: message,
    message: `\`Bad argument\nAvaible arguments: rock , paper , scissors\``,
    color: '#f44262'
  });
  const computer = odp[Math.floor(Math.random()*odp.length)]
  function mlt(){ Mike.models.snap({
      object: message,
      message: `**Rock , paper , scissors**\n\n:slight_smile: Your choice: **${args.join(" ")}**\n:computer: Computer choice: **${computer}**\n\n**${win}**`,
      color: '#ffe680'
    })}
  if (computer == choice) { win = "There is no winner"; mlt() }
    if (computer == "rock")
    {
      if (choice == "scissors") { win = "You lose!"; mlt() }
      if (choice == "paper") { win = "You win!"; mlt() }
    return;
    }
    else if (computer == "paper")
    {
      if (choice == "rock") { win = "You lose!"; mlt() }
      if (choice == "scissors") { win = "You win!"; mlt() }
    return;
    }
    else if (computer == "scissors")
    {
      if (choice == "paper") { win = "You lose!"; mlt() }
      if (choice == "rock") { win = "You win!"; mlt() }
    return;
    }
}
exports.data = {
  triggers: ['rps'],
  description: 'None',
  usage: [
    '{prefix}{command} <choice>\nAvaible arguments: rock , paper , scissors'
  ],
  args: [
    {
      'type':'any',
      'name':'text'
    }
  ]
}
