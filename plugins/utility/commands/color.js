exports.output = async ({message, args}) => {
    const rgbToHSL = (red, green, blue) => {
        const r = red / 255;
        const g = green / 255;
        const b = blue / 255;

        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;

        if (max == min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
            }
            h /= 6;
        }

        h = Math.round(h * 360);
        s = Math.round(s * 100);
        l = Math.round(l * 100);

        return { hue: h, saturation: s, lightness: l };
    };

    const resolveColor = input => {
        if (input.startsWith('#')) input = input.substr(1);
        if (input.length === 3) input = input.split('').map(c => c + c).join('');

        const hex = input;
        const [red, green, blue] = [hex.substr(0, 2), hex.substr(2, 2), hex.substr(4, 2)]
            .map(value => parseInt(value, 16));
        const { hue, saturation, lightness } = rgbToHSL(red, green, blue);

        return { hex, red, green, blue, hue, saturation, lightness };
    };

    if (!/^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/.test(args[0])) {
        return Mike.models.snap({
          object: message,
          message: `\`The color must be in the hex format.\``,
          color: '#f44262'
        })
    }
    const color = resolveColor(args[0]);
    return Mike.models.snap({
      object: message,
      message: `Hex: \`#${color.hex}\`
      RGB: \`rgb(${color.red}, ${color.green}, ${color.blue})\`
      HSL: \`hsl(${color.hue}, ${color.saturation}%, ${color.lightness}%)\`
      [Link](http://placehold.it/500/${color.hex}/${color.hex})`
    })
}

exports.data = {
    triggers: ['color', 'colour'],
    description: 'Shows information and a preview of a color.',
    usage: [
        '{prefix}{command} <hex>',
    ],
    args: [
        {
            type:'text',
            name:'hex'
        }
    ]
}
