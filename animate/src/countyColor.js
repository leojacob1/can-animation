import COUNTY_DATA from './data/county-history-data.json';
import dayToDate from './dayToDate.js';
import smoothWithRollingAverage from './smoothing.js';
import tinygradient from 'tinygradient';


function countyColor(day, countyid, handleChange) {
  var fillColor;
  const trailingDates = [dayToDate(day-6), dayToDate(day-5), dayToDate(day-4), dayToDate(day-3), dayToDate(day-2), dayToDate(day-1), dayToDate(day)]

  var dataForDate;
  var dataForCounty;
  var population;
  var casesToday;
  var newCaseDensityArray = trailingDates.map(date => {
    dataForDate = COUNTY_DATA[date];
    if (!dataForDate) {
      return null;
    }
    dataForCounty = dataForDate[countyid];
    if (!dataForCounty) {
      return null;
    }
    let caseDensity = dataForCounty['caseDensity'];
    return caseDensity;
  })


  newCaseDensityArray = newCaseDensityArray.filter(x => x!== null);
  // if (newCaseDensityArray.length < 5) {
  //   return "#d4d4d4";
  // }
  const newCaseDensityTrailingAverage = newCaseDensityArray.reduce((a,b) => a+b, 0) / newCaseDensityArray.length;


  var gradient = tinygradient([
    {color: '#00d474', pos: 0},
    {color: '#ffc900', pos: 0.02},
    {color: '#ff9600', pos: 0.2},
    {color: '#ff0034', pos: 0.5},
    {color: '#700000', pos: 1}
  ]);

  if (!newCaseDensityTrailingAverage) {
    return '#00d474';
  }
  var gradientPercent = newCaseDensityTrailingAverage / 50;
  if (gradientPercent > 1) {
    gradientPercent = 1;
  } else if (gradientPercent < 0) {
    gradientPercent = 0;
  }

  const color = gradient.rgbAt(gradientPercent);
  const colorString = `rgb(${color._r}, ${color._g}, ${color._b})`;

  return colorString
};

export default countyColor;
