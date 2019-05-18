Mike.dog = require("dogapi");

module.exports = async () => {
  var options = {
   api_key: Mike.config.tokens.dogapi,
   app_key: Mike.config.tokens.dogapp,
  };
  Mike.dog.initialize(options);
  setInterval(() => {
      Mike.datadog.sendall()
  }, 10*1000);
};
