exports.toseconds = async (str) => {
  const p = str.split(':')
  let s = 0, m = 1
  while (p.length > 0) {
    s += m * parseInt(p.pop(), 10)
    m *= 60;
  }
  return s
}

exports.getTime = async () =>  {
  const date = new Date()

  let hour = date.getHours()
  hour = (hour < 10 ? "0" : "") + hour

  let min  = date.getMinutes()
  min = (min < 10 ? "0" : "") + min

  let sec  = date.getSeconds()
  sec = (sec < 10 ? "0" : "") + sec

  let year = date.getFullYear()

  let month = date.getMonth() + 1
  month = (month < 10 ? "0" : "") + month

  let day  = date.getDate()
  day = (day < 10 ? "0" : "") + day

  return day + ":" + month + ":" + year + " " + hour + ":" + min + ":" + sec

}

exports.formatLength = async (ms, replace = true) => {
  let h = Math.floor(ms / 1000 / 60 / 60)
  let min = Math.floor(ms / 1000 / 60 - h * 60)
  let sec = Math.floor(ms / 1000 - min * 60 - h * 60 * 60)

  let uh = false
  if (!h == 0) {uh = true; if(h <= 9) {h = "0" + h}}
  if (min <= 9) min = "0" + min
  if (sec <= 9) sec = "0" + sec
  var time = ""
  if(uh) {if(h >= 200) {time = "LIVE"} else {time = `${h}:${min}:${sec}`}} else {time = `${min}:${sec}`}
  if(replace) {
      if(time == "00:00") return "LIVE";
  }
  return time;
}
