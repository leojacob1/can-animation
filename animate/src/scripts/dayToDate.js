function dayToDate(day, option = false) {
  const startDate = new Date(2020, 2, 0);
  const newDateStamp = startDate.getTime() + day * 86400000;
  const newDate = new Date();
  newDate.setTime(newDateStamp);
  var dateString;
  if (!option) {
    dateString = newDate.toISOString().substring(0, 10);
  } else {
    if (newDate.toISOString()[8] === "0") {
      dateString = newDate.toDateString().substring(4, 7) + ' ' + newDate.toDateString().substring(9, 10);

    } else {
      dateString = newDate.toDateString().substring(4, 7) + ' ' + newDate.toDateString().substring(8, 10);

    }
  }

  return dateString;
}

module.exports = dayToDate;
