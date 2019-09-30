exports.output = async ({message, args}) => {
  let role = message.mentions.roles.first()
  let perms = false

  if (args.includes('--perms')) {
    args = args.filter(function(arg){
      return arg != '--perms'
    })
    perms = true
  }
  
  if (!role) role = message.guild.roles.find(role => role.name === args.join(' '))
  if (!role) role = message.guild.roles.find(role => role.id === args.join(' '))
  if (!role) {
    return Mike.models.snap({
      object: message,
       message: '\`Role not found!\`',
      color: '#f44262'
    })
  }
  
  let permissions = []
  if (perms) {
    const serializedPermissions = role.serialize()
    for (let permission in serializedPermissions) {
      if (serializedPermissions[permission]) {
        permissions.push(permission.replace(/_/g, ' ').toTitleCase())
      }
    }
  }

  Mike.models.snap({
    object: message,
    message: `**ID: **${role.id}
              **Members: **${role.members.size}
              **Hoisted: **${role.hoist ? 'Yes' : 'No'}
              **External: **${role.menaged ? 'Yes' : 'No'}
              ${perms ? `**Perms: **\n${permissions.join('\n')}`: ''}
              **Created At:**\n${role.createdAt.toUTCString()}
    `,
    thumbnail: `https://dummyimage.com/250/${role.hexColor.slice(1)}/&text=%20`
  })

}
exports.data = {
  triggers: ['roleinfo'],
  description: 'Shows role info.',
  usage: [
    '{prefix}{command} <role name> [--perms]',
    '{prefix}{command} <role mention> [--perms]',
    '{prefix}{command} <role id> [--perms]'
  ],
  args: [
    {
      'type':'any',
      'name':'role'
    }
  ]
}
