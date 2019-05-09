exports.output = async ({message, args}) => {
    const user = await Mike.utils.users.search(message, args[0])
    const av = user.displayAvatarURL;
    const png = user.displayAvatarURL.replace('.gif', '.png');
    const webp = png.replace('.png', '.webp');
    const jpg = png.replace('.png', '.jpg');
    return Mike.exec.snap(message, `${user.tag} (${user.id})\n[png](${png}) | [webp](${webp}) | [jpg](${jpg})`,false, null, av)

}

exports.data = {
    triggers: ['avatar', 'av'],
    description: 'Shows user avatar.',
    usage: [
        '{prefix}{command} [mention]',
        '{prefix}{command} [id]',
        '{prefix}{command} [name]'
    ]
}
