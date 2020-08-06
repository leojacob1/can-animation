import React from 'react';
import Papa from 'papaparse';
import fs from 'fs';

import COUNTY_DATA from './data/sample.json';
const days = [
  '2020-01-22',
  '2020-01-23',
  '2020-01-24',
  '2020-01-25',
  '2020-01-26',
  '2020-01-27',
  '2020-01-28',
  '2020-01-29',
  '2020-01-30',
  '2020-01-31',
  '2020-02-01',
  '2020-02-02',
]


function countyColor(day, countyid, handleChange) {
  var fillColor;
  const today = days[day];
  const yesterday = days[day - 1];

  const dataForDate = COUNTY_DATA[today];
  const dataForCounty = dataForDate[countyid];
  if (!dataForCounty) {
    console.log('No county data for', countyid, 'on', today)
    return 'gray';
  }
  const population = dataForCounty['population'];

  let casesToday = dataForCounty['cumulativeConfirmedCases'];
  // if (casesToday === null) {
  //   return 'gray';
  // }
  casesToday = casesToday ? casesToday : Math.floor(Math.random() * 25);

  let casesYesterday = COUNTY_DATA[yesterday][countyid]['cumulativeConfirmedCases'];
  casesYesterday = casesYesterday ? casesYesterday : 0;

  const caseDensity = (casesToday - casesYesterday) / population * 100 * 1000;

  // const dataByCounty = csvData.filter(data => data.fips === countyid)
  // const cumulativeInfected = dataByCounty.filter(data => data.date === "2020-05-15")[0].cumulativeInfected
  // const cumulativeInfectedYesterday = dataByCounty.filter(data => data.date === "2020-05-14")[0].cumulativeInfected
  // const newCases = cumulativeInfected - cumulativeInfectedYesterday
  // get population!
  if (caseDensity > 100) {
    fillColor = 'red';
  } else if (caseDensity > 50) {
    fillColor = 'orange';
  } else if (caseDensity >= 1) {
    fillColor = 'yellow';
  } else if (caseDensity < 1) {
    fillColor = 'green';
  };
  //handleChange(today);
  return fillColor;

  // const countyApiUrl = `https://data.covidactnow.org/latest/us/counties/${countyid}.OBSERVED_INTERVENTION.timeseries.json`;
  // return axios.get(countyApiUrl)
  //   .then(function (response) {
  //     var fillColor = 'purple';
  //
  //     let cumCaseCountToday = response.data.actualsTimeseries[99].cumulativeConfirmedCases;
  //     cumCaseCountToday = cumCaseCountToday ? cumCaseCountToday : 0;
  //
  //     let cumCaseCountYesterday = response.data.actualsTimeseries[98].cumulativeConfirmedCases;
  //     cumCaseCountYesterday = cumCaseCountYesterday ? cumCaseCountYesterday : 0;
  //
  //     const newCasesToday = cumCaseCountToday - cumCaseCountYesterday;
  //     const population = response.data.actualsTimeseries[0].population;
  //     const caseDensity = newCasesToday/population*100*1000;
  //
  //     if (caseDensity > 25) {
  //       fillColor = 'red';
  //     } else if (caseDensity > 10) {
  //       fillColor = 'orange';
  //     } else if (caseDensity >= 1) {
  //       fillColor = 'yellow';
  //     } else if (caseDensity < 1) {
  //       fillColor = 'green';
  //     };
  //     return fillColor;
  //   })
  //   .catch(function (error) {
  //     debugger;
  //     console.log("ERROR: " + countyid);
  //   })
};

export default countyColor;

//
// {
//   "03-12-20": {
//     "10001": {
//       "newCases": 10,
//       "population": 1000
//     },
//     "20002": {
//       "newCases": 200,
//       "population": 20000
//     }
//   },
//   "03-13-20": {
//     "10001": {
//       "newCases": 15,
//       "population": 1000
//     },
//     "20002": {
//       "newCases": 300,
//       "population": 20000
//     }
//   }
// }
//
//
//
// [
//   {
//     fips: '10001',
//     population: '1000',
//     actualsTimeseries: [
//       {
//         date: '2020-03-12',
//         population: 1000,
//         cumulativeConfirmedCases: 15
//       },
//       {
//         date: '2020-03-13',
//         population: 1000,
//         cumulativeConfirmedCases: 30
//       }
//     ]
//   },
//   {
//     fips: '20002',
//     population: 20000,
//     actualsTimeseries: [
//       {
//         date: '2020-03-12',
//         population: 20000,
//         cumulativeConfirmedCases: 200
//       },
//       {
//         date: '2020-03-13',
//         population: 20000,
//         cumulativeConfirmedCases: 500
//       }
//     ]
//   }
// ]
