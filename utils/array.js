exports.random = async (seed, count = 1, unique = false) => {
    if (unique && seed.length < count) {
        count = seed.length;
    }

  let randomElements = [];

  for (let i = 0; i < count; i++) {
      let randomElement = seed[Math.floor(Math.random() * seed.length)];
      randomElements.push(randomElement);

      if (unique) seed.splice(seed.indexOf(randomElement), 1);
  }

  return randomElements;
};

exports.single = (seed) => {
  return seed[Math.floor(Math.random() * seed.length)]
}

exports.getCount = (array, value) => {
  var count = 0;
  array.forEach((v) => (v === value && count++));
  return count;
}

exports.shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
