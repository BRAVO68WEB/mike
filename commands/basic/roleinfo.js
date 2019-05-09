exports.output = async ({message, args}) => {
    let role = message.mentions.roles.first();
    if (!role) role = message.guild.roles.find(role => role.name === args.join(' '));
    if (!role) return Mike.exec.error(message, 'Role not found!')
    let permissions = [];
    let serializedPermissions = role.serialize();
    for (let permission in serializedPermissions) {
      if (serializedPermissions[permission]) {
        permissions.push(permission.replace(/_/g, ' '));
      }
    }

    Mike.exec.snap(message, `**ID:**\n${role.id}\n**Members:**\n${role.members.size}\n**Hoisted:**\n${role.hoist ? 'Yes' : 'No'}\n**External:**\n${role.menaged ? 'Yes' : 'No'}\n**Created At:**\n${role.createdAt.toUTCString()}`, false, `https://dummyimage.com/250/${role.hexColor.slice(1)}/&text=%20`)
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
