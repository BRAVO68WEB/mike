const snek = require('snekfetch');

exports.getData = async (id, key) => {
  try {
    const data =  await snek.get(`http://badosz.com:6363/${id}`)
                            .query({
                              key: key
                            })
    return data.body
  } catch (e) {
    return undefined
  }

}

exports.saveData = async (id, key, value) => {
  const data =  await snek.post(`http://badosz.com:6363/${id}`)
                          .query({
                            key: key,
                            value: value
                          })
  return data.body
}
