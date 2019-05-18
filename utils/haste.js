const { post } = require("snekfetch");

module.exports = (input, extension = "js") => {
    return post("https://hastebin.com/documents")
        .send(input)
        .then(res => `https://hastebin.com/${res.body.key}.${extension}`);
}
