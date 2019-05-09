const gameActivities = require('./modules/gameActivities');
const songActivities = require('./modules/songActivities');

module.exports = async (oldMember, newMember) => {
  try {
    await gameActivities(oldMember, newMember);
    await songActivities(oldMember, newMember);
  }
  catch (e) {
    console.log(e)
  }
}
