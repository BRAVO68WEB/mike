exports.getdate = (offset) => {
    offset = (60 * 60 * 1000 * offset);
  
    const UTC = new Date().getTime();
  
    return new Date(UTC + offset);
};