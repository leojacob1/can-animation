import dayToDate from './dayToDate.js';
import tinygradient from 'tinygradient';


function countyColor(day, countyid, COUNTY_DATA) {
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
    {color: '#00d474', pos: 0/75},
    {color: '#ffc900', pos: 1/75},
    {color: '#ff9600', pos: 10/75},
    {color: '#ff0034', pos: 25/75},
    {color: '#790019', pos: 75/75}
  ]);

  if (!newCaseDensityTrailingAverage) {
    return '#00d474';
  }
  var gradientPercent = newCaseDensityTrailingAverage / 75;
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
