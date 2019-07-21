const qrcode = require("qrcode");
const tempy = require("tempy");

exports.output = async ({message, args}) => {
    const qrOutput = tempy.file({ extension: "png" });
    message.channel.startTyping();
    qrcode.toFile(qrOutput, args.join(" "), { margin: 1 }, (error) => {
        if (error) throw new Error(error);
        message.channel.stopTyping();
        message.channel.send({
            files: [{
                attachment: qrOutput,
                name: "qr.png"
            }]
        });
    });
}

exports.data = {
    triggers: ['qrcode'],
    description: 'Generates qrcode.',
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
