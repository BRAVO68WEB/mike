Mike.dog = require("dogapi");

module.exports = async () => {
  var options = {
   api_key: Mike.config.tokens.dogapi,
   app_key: Mike.config.tokens.dogapp,
  };
  Mike.dog.initialize(options);
  if (Mike.type != 'beta') {
    setInterval(() => {
        Mike.datadog.sendall()
    }, 10*1000);
  }
};
