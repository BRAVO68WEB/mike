exports.output = async ({message}) => {
const servers_names = Mike.guilds.map(m=>m.name).join("\n");
    Mike.models.mult({
      object: message,
      fields: [
        ['Servers',servers_names,false],
      ],
    })
};
exports.data = {
    triggers: ['servers'],
    description: 'None',
    developer: true,
}
