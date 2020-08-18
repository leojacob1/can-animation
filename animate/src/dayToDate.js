function dayToDate(day) {
  const startDate = new Date(2020, 3, 1);
  const newDateStamp = startDate.getTime() + day * 86400000;
  const newDate = new Date();
  newDate.setTime(newDateStamp);
  const dateString = newDate.toISOString().substring(0, 10);

  return dateString;
}

module.exports = dayToDate;
