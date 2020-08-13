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
    fillColor = '#FF0000'; //red
  } 
  else if (caseDensity > 20) {
    fillColor = '#FF6000'; //orange
  } 
  else if (caseDensity > 15) {
    fillColor = '#FFB000'; //orange
  }
  else if (caseDensity > 10) {
    fillColor = '#FFFF00'; //orange
  }
  else if (caseDensity > 5) {
    fillColor = '#B0FF00'; //orange
  }
  else if (caseDensity >= 1) {
    fillColor = '#70FF00'; //light orange
  } 
  else if (caseDensity < 1) {
    fillColor = '#10FF00'; //green
  };

  return fillColor;
};

export default countyColor;
