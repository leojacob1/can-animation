function dayToDate(day) {
  var adjustment;
  if (day < 10) {
    adjustment = day + 22;
    if (adjustment < 10) {
      return '2020-01-0' + adjustment.toString();
    }
    return '2020-01-' + adjustment.toString();
  } else if (day < 39) {
    adjustment = day - 9;
    if (adjustment < 10) {
      return '2020-02-0' + adjustment.toString();
    }
    return '2020-02-' + adjustment.toString();
  } else if (day < 70) {
    adjustment = day - 38;
    if (adjustment < 10) {
      return '2020-03-0' + adjustment.toString();
    }
    return '2020-03-' + adjustment.toString();
  } else if (day < 100) {
    adjustment = day - 69;
    if (adjustment < 10) {
      return '2020-04-0' + adjustment.toString();
    }
    return '2020-04-' + adjustment.toString();
  } else if (day < 131) {
    adjustment = day - 99;
    if (adjustment < 10) {
      return '2020-05-0' + adjustment.toString();
    }
    return '2020-05-' + adjustment.toString();
  } else if (day < 161) {
    adjustment = day - 130;
    if (adjustment < 10) {
      return '2020-06-0' + adjustment.toString();
    }
    return '2020-06-' + adjustment.toString();
  } else if (day < 192) {
    adjustment = day - 160;
    if (adjustment < 10) {
      return '2020-07-0' + adjustment.toString();
    }
    return '2020-07-' + adjustment.toString();
  } else if (day < 222) {
    adjustment = day - 191;
    if (adjustment < 10) {
      return '2020-08-0' + adjustment.toString();
    }
    return '2020-08-' + adjustment.toString();
  } else {
    return 'out of range';
  }
}

module.exports = dayToDate;
