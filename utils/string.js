exports.sparse = async (string) => {
  arr = string.split(/[{}]/);
  output = ``
  arr.forEach(function(element) {
    sarr = element.split("|")
    output += sarr[Math.floor(Math.random()*sarr.length)]
  });
  return output
}
