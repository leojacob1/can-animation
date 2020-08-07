const dayToDate = require('./src/dayToDate.js');

const days = [...Array(194).keys()];

days.forEach(function(item, index) {
  console.log(dayToDate(item))
});


// const countyApiUrl = `https://data.covidactnow.org/latest/us/counties.OBSERVED_INTERVENTION.timeseries.json`;
// axios.get(countyApiUrl).then(resp => {
//   fs.writeFileSync('./src/data/countyData.json', resp.data);
// })



//
// const dataByCounty = countyData.filter(data => data.fips === countyid)
// const dataByCountyDate = dataByCounty.filter(data => data.date === "2020-05-15")
// console.log(dataByCountyDate)
