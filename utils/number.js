exports.random = async (min, max) => {
  return Math.floor(Math.random() * max + min)
};
