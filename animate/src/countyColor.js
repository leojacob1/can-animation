import STATE_DATA from './data/state-history-data.json';
import dayToDate from './dayToDate.js';
import tinygradient from 'tinygradient';


function stateColor(day, stateid) {

  var fillColor;
  const trailingDates = [dayToDate(day-6), dayToDate(day-5), dayToDate(day-4), dayToDate(day-3), dayToDate(day-2), dayToDate(day-1), dayToDate(day)]

  var dataForDate;
  var dataForState;;
  var population;
  var infectionRateArray = trailingDates.map(date => {
    dataForDate = STATE_DATA[date];
    if (!dataForDate) {
      return null;
    }
    dataForState = dataForDate[stateid];
    if (!dataForState) {
      return null;
    }

    let infectionRate = dataForState['infectionRate'];
    return infectionRate;
  })


  infectionRateArray = infectionRateArray.filter(x => x!== null);
  // if (newCaseDensityArray.length < 5) {
  //   return "#d4d4d4";
  // }
  const infectionRateTrailingAverage = infectionRateArray.reduce((a,b) => a+b, 0) / infectionRateArray.length;


  var gradient = tinygradient([
    {color: '#00d474', pos: 0},
    {color: '#ffc900', pos: 0.6428},
    {color: '#ff9600', pos: 0.7857},
    {color: '#ff0034', pos: 1}
  ]);


  if (!infectionRateTrailingAverage) {
    return '#bfbfbf';
  }
  var gradientPercent = infectionRateTrailingAverage / 1.4;
  if (gradientPercent > 1) {
    gradientPercent = 1;
  } else if (gradientPercent < 0) {
    gradientPercent = 0;
  }

  const color = gradient.rgbAt(gradientPercent);
  const colorString = `rgb(${color._r}, ${color._g}, ${color._b})`;

  return colorString
};

export default stateColor;
