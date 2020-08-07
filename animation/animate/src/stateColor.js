import React from 'react';
import axios from 'axios';



function stateColor(abbrv) {
  const stateApiUrl = `https://data.covidactnow.org/latest/us/states/${abbrv}.OBSERVED_INTERVENTION.timeseries.json`;
  return axios.get(stateApiUrl)
    .then(function (response) {
      var fillColor;
      console.log(response.data.actualsTimeseries);

      let cumCaseCountToday = response.data.actualsTimeseries[100].cumulativeConfirmedCases;
      cumCaseCountToday = cumCaseCountToday ? cumCaseCountToday : 0;

      let cumCaseCountYesterday = response.data.actualsTimeseries[99].cumulativeConfirmedCases;
      cumCaseCountYesterday = cumCaseCountYesterday ? cumCaseCountYesterday : 0;

      const newCasesToday = cumCaseCountToday - cumCaseCountYesterday;
      const population = response.data.actualsTimeseries[0].population;
      const caseDensity = newCasesToday/population*100*1000;

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
    })
    .catch(function (error) {
      console.log("ERROR: " + abbrv);
    })
};

export default stateColor;
