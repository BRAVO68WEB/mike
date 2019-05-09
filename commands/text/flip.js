exports.output = async ({message, args}) => {
    const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>?@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~';
    const offset = '!'.charCodeAt(0);
    const text = args.join(' ').split('')
        .map(c => c.charCodeAt(0) - offset)
        .map(c => mapping[c] || ' ')
        .reverse().join('');
    Mike.exec.snap(message, text, false)
}
exports.data = {
    triggers: ['flip'],
    description: 'Flips your text.',
    usage: [
        '{prefix}{command} <text>',
    ],
    args: [
        {
            'type':'any',
            'name':'text'
        }
    ]

}
