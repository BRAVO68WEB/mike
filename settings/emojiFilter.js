module.exports = async (message, guild, args) => {
  if(args[1] == "enable" || args[1] == "disable"){
    require("./models/filter")(message, guild, args, 'emojis')
  } else {
      return Mike.exec.error(message,"You can only disable or enable this option.",)
  }

}
