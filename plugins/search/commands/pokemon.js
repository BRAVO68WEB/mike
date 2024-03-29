const Pokedex = require('pokedex-api')
const pokedex = new Pokedex({
  userAgent: 'Mike (https://mikebot.xyz)',
  version: 'v1'
})

exports.output = async ({message, args}) => {
  try {
    let pokemon = await pokedex.getPokemonByName(encodeURIComponent(args.join(' ')))
    pokemon = pokemon[0]
    return Mike.models.mult({
      object: message,
      fields: [
        ["Number", pokemon.number, true],
        ["Species", pokemon.species, true],
        ["Types", pokemon.types.join('\n'), true],
        ["Abilities", `Normal: ${pokemon.abilities.normal.join(', ') || '-'}\nHidden: ${pokemon.abilities.hidden.join(', ') || '-'}`, true],
        ["Egg Groups", pokemon.eggGroups.join('\n'), true],
        ["Gender Ratio", pokemon.gender.length ? `${pokemon.gender[0]}:${pokemon.gender[1]}` : 'Genderless', true],
        ["Height", pokemon.height, true],
        ["Weight", pokemon.weight, true],
        ["Evolution Line", pokemon.family.evolutionLine.join(' -> '), true],
        ["Description", pokemon.description, false]
      ],
      thumbnail: pokemon.sprite,
      footer: `Discovered in generation ${pokemon.gen}`
    })
  } catch (e) {
    return Mike.models.snap({
      object: message,
      message: '\`Pokemon not found.\`',
      color: '#f44262'
    })
  }
}
exports.data = {
  triggers: ['pokemon'],
  description: 'Shows pokemon info.',
  usage: [
    '{prefix}{command} <pokemon>',
  ],
  args: [
    {
      'type':'text',
      'name':'pokemon'
    }
  ]
}
