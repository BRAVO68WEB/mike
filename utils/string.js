String.prototype.toTitleCase = function() {
  let newstr = this.split(' ')
  for (let i = 0; i < newstr.length; i++) {
    if (newstr[i] === '') continue
    let copy = newstr[i].substring(1).toLowerCase()
    newstr[i] = newstr[i][0].toUpperCase() + copy
  }
  newstr = newstr.join(' ')
  return newstr
}

exports.customparse = async (string) => {
  const arr = string.split(/[{}]/)
  let output = ``
  arr.forEach(element => {
    sarr = element.split("|")
    output += sarr[Math.floor(Math.random()*sarr.length)]
  })

  return output
}
