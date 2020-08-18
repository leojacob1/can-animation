import COUNTY_DATA from './data/county-data-8-5.json';
import dayToDate from './dayToDate.js';
import tinygradient from 'tinygradient';


function countyColor(day, countyid, handleChange) {
  var fillColor;
  const trailingDates = [dayToDate(day-7), dayToDate(day-6), dayToDate(day-5), dayToDate(day-4), dayToDate(day-3), dayToDate(day-2), dayToDate(day-1), dayToDate(day)]
  // const today = dayToDate(day);
  // const yesterday = dayToDate(day - 1);

  var dataForDate;
  var dataForCounty;
  var population;
  var casesToday;
  const cumCasesArray = trailingDates.map(date => {
    dataForDate = COUNTY_DATA[date];
    if (!dataForDate) {
      return null
    }
    dataForCounty = dataForDate[countyid];
    if (!dataForCounty) {
      return null
    }
    population = dataForCounty['population'];
    casesToday = dataForCounty['cumulativeConfirmedCases'];
    return {'casesToday': casesToday ? casesToday : 0, "population": population};
  })

  var newCaseDensityArray = cumCasesArray.map((cumCaseObj, index) => {
    if (index && cumCaseObj && cumCasesArray[index-1]) {
      let newCases = cumCaseObj.casesToday - cumCasesArray[index - 1].casesToday;
      let newCaseDensity = newCases / cumCaseObj.population * 100 * 1000;
      return newCaseDensity;
    } else {
      return null;
    }
  });

  // console.log('newCaseDensityArray', newCaseDensityArray);

  newCaseDensityArray = newCaseDensityArray.filter(x => x!== null);
  if (newCaseDensityArray.length < 5) {
    return "#d4d4d4";
  }
  const newCaseDensityTrailingAverage = newCaseDensityArray.reduce((a,b) => a+b, 0) / newCaseDensityArray.length;

  // console.log('newCaseDensityTrailingAverage', newCaseDensityTrailingAverage);


  // const dataForDate = COUNTY_DATA[today];
  // if (!dataForDate) {
  //   return 'gray'
  // };
  // const dataForCounty = dataForDate[countyid];
  // if (!dataForCounty) {
  //   return 'gray';
  // };
  // const population = dataForCounty['population'];
  //
  // let casesToday = dataForCounty['cumulativeConfirmedCases'];
  // if (casesToday === null) {
  //   return '#00d475';
  // };
  //
  // let dataForDateYesterday = COUNTY_DATA[yesterday]
  // if (!dataForDateYesterday) {
  //   var casesYesterday = 0
  // } else {
  //   var dataForCountyYesterday = dataForDateYesterday[countyid];
  //   var casesYesterday = dataForCountyYesterday['cumulativeConfirmedCases'];
  //   casesYesterday = casesYesterday ? casesYesterday : 0;
  // }
  //
  // const caseDensity = (casesToday - casesYesterday) / population * 100 * 1000;

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
    gradientPercent = 0
  }
  // if (!(0 <= gradientPercent && 1 >= gradientPercent)) {
  //   console.log(gradientPercent);
  // }

  const color = gradient.rgbAt(gradientPercent);
  const colorString = `rgb(${color._r}, ${color._g}, ${color._b})`;

  return colorString

  // if (newCaseDensityTrailingAverage > 25) {
  //   fillColor = '#ff0034'; //red
  // }
  // // else if (newCaseDensityTrailingAverage > 20) {
  // //   fillColor = '#ff8000'; //dark orange
  // // }
  // else if (newCaseDensityTrailingAverage > 10) {
  //   fillColor = '#ff9600'; //orange
  // }
  // else if (newCaseDensityTrailingAverage >= 1) {
  //   fillColor = '#ffc900'; //yellow
  // }
  // else if (newCaseDensityTrailingAverage < 1) {
  //   fillColor = '#00d474'; //green
  // } else {
  //   // console.log("cumCasesArray", cumCasesArray);
  //   // console.log("newCaseDensityArray", newCaseDensityArray);
  //   // console.log("newCaseDensityTrailingAverage", newCaseDensityTrailingAverage);
  //
  //   return "#d4d4d4"; //ashy white
  // };
  //
  // return fillColor;
};

export default countyColor;
