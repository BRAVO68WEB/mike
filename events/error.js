module.exports = (error) => {
    Mike.stats.events.errors += 1
    try{
        Mike.utils.log.error(error);
    }catch(err) {
        Mike.utils.log.error(err);
    }
};
