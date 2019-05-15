exports.sparse = async (string) => {
  arr = string.split(/[{}]/);
  output = ``
  arr.forEach(function(element) {
    sarr = element.split("|")
    output += sarr[Math.floor(Math.random()*sarr.length)]
  });
  return output
}

String.prototype.toTitleCase = function() {
  let newstr = this.split(' ');
  for (let i = 0; i < newstr.length; i++) {
    if (newstr[i] === '') continue;
    let copy = newstr[i].substring(1).toLowerCase();
    newstr[i] = newstr[i][0].toUpperCase() + copy;
  }
  newstr = newstr.join(' ');
  return newstr;
};
