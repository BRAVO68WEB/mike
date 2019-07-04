exports.output = async ({message, args}) => {
    let role = message.mentions.roles.first()
    if (!role) role = message.guild.roles.find(role => role.name === args.join(' '))
    if (!role) {
      return Mike.models.snap({
        object: message,
        message: '\`Role not found!\`',
        color: '#f44262'
      })
    }
    let permissions = []
    let serializedPermissions = role.serialize()
    for (let permission in serializedPermissions) {
      if (serializedPermissions[permission]) {
        permissions.push(permission.replace(/_/g, ' '))
      }
    }
    Mike.models.snap({
      object: message,
      message: `**ID: **${role.id}
                **Members: **${role.members.size}
                **Hoisted: **${role.hoist ? 'Yes' : 'No'}
                **External: **${role.menaged ? 'Yes' : 'No'}

                **Created At:**\n${role.createdAt.toUTCString()}
      `,
      thumbnail: `https://dummyimage.com/250/${role.hexColor.slice(1)}/&text=%20`
    })

}
exports.data = {
  triggers: ['roleinfo'],
  description: 'Shows role info.',
  usage: [
    '{prefix}{command} <role name>',
    '{prefix}{command} <role mention>'
  ],
  args: [
    {
      'type':'any',
      'name':'role'
    }
  ]
}
