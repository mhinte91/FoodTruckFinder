module.exports = {
  currentTime: function() {
    let currentDate = new Date();
    let currentTime24 = currentDate
      .toLocaleTimeString('en-US', {
        hour12: false,
        timeZone: 'America/Chicago'
      })
      .slice(0, 5);
    return currentTime24;
  },

  currentDay: function() {
    let currentDay = new Date().getDay();
    return currentDay;
  }
};
