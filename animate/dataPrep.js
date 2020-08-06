const COUNTY_DATA = require('./src/data/sample.json');


// const countyApiUrl = `https://data.covidactnow.org/latest/us/counties.OBSERVED_INTERVENTION.timeseries.json`;
// axios.get(countyApiUrl).then(resp => {
//   fs.writeFileSync('./src/data/countyData.json', resp.data);
// })

console.log(COUNTY_DATA['2020-02-01']['36081'])


//
// const dataByCounty = countyData.filter(data => data.fips === countyid)
// const dataByCountyDate = dataByCounty.filter(data => data.date === "2020-05-15")
// console.log(dataByCountyDate)
