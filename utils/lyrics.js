const cheerio = require("cheerio")

class Lyrics {

  static async request(path) {
    return Mike.http.get(`https://api.genius.com/${path}`)
      .set("Authorization", `Bearer ${Mike.tokens.genius}`)
      .then(res => res.body)
      .catch(error => {
        if (error.body.error) throw new Error(`${error.body.error}: ${error.body.error_description}`)
        throw error
      })
  }

  static scrape(url) {
    return Mike.http.get(url).then(res => {
      const $ = cheerio.load(res.text)
      return $(".lyrics") ? $(".lyrics").text().trim() : null
    })
  }
}

module.exports = Lyrics
