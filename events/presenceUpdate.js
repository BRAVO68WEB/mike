const gameActivities = require('./modules/gameActivities');
const songActivities = require('./modules/songActivities');
const songActivitiesGlobal = require('./modules/songActivitiesGlobal');
const gameActivitiesGlobal = require('./modules/gameActivitiesGlobal');

module.exports = async (oldMember, newMember) => {
  try {
    await gameActivities(oldMember, newMember);
    await songActivities(oldMember, newMember);
    await gameActivitiesGlobal(oldMember, newMember);
    await songActivitiesGlobal(oldMember, newMember);
  }
  catch (e) {
    console.log(e)
  }
}
