exports.getLevel = (points) => {
  let level = -1 + Math.sqrt(4 + points/100)
  return Math.floor(level)
}

exports.getPoints = (level) => {
  return 100*(level-1)*(level+3)
}
