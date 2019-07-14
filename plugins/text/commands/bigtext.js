exports.output = async ({message, args}) => {
  const chars =  args.join(' ').toLowerCase().
  replace(/[a-z]/g, ':regional_indicator_$&:').
  replace(/1/g, ':one:').
  replace(/2/g, ':two:').
  replace(/3/g, ':three:').
  replace(/4/g, ':four:').
  replace(/5/g, ':five:').
  replace(/6/g, ':six:').
  replace(/7/g, ':seven:').
  replace(/8/g, ':eight:').
  replace(/9/g, ':nine:').
  replace(/0/g, ':zero:').
  replace(/❤/g, ':heart_decoration:')

  return Mike.models.snap({
    object: message,
    message: chars,
  })
  
}
exports.data = {
  triggers: ['bigtext','emojify'],
  description: 'Makes your text BIG.',
  usage: [
    '{prefix}{command} <text>',
  ],
  args: [
    {
        'type':'text',
        'name':'text'
    }
  ]
}
