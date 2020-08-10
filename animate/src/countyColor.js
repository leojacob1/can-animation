import COUNTY_DATA from './data/county-data-8-5.json';
import dayToDate from './dayToDate.js';


function countyColor(day, countyid, handleChange) {
  var fillColor;
  const today = dayToDate(day);
  const yesterday = dayToDate(day - 1);

  const dataForDate = COUNTY_DATA[today];
  if (!dataForDate) {
    return 'gray'
  };
  const dataForCounty = dataForDate[countyid];
  if (!dataForCounty) {
    return 'gray';
  };
  const population = dataForCounty['population'];

  let casesToday = dataForCounty['cumulativeConfirmedCases'];
  if (casesToday === null) {
    return '#00d475';
  };

  let dataForDateYesterday = COUNTY_DATA[yesterday]
  if (!dataForDateYesterday) {
    var casesYesterday = 0
  } else {
    var dataForCountyYesterday = dataForDateYesterday[countyid];
    var casesYesterday = dataForCountyYesterday['cumulativeConfirmedCases'];
    casesYesterday = casesYesterday ? casesYesterday : 0;
  }

  const caseDensity = (casesToday - casesYesterday) / population * 100 * 1000;

  if (caseDensity > 25) {
    fillColor = '#ff0034';
  } else if (caseDensity > 10) {
    fillColor = '#ff9600';
  } else if (caseDensity >= 1) {
    fillColor = '#ffc900';
  } else if (caseDensity < 1) {
    fillColor = '#00d475';
  };

  return fillColor;
};

export default countyColor;
