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

// As case density goes down, r, g, and b, go up/down by a certain amount. Convert that rgb to hex and return.
//if 10<caseDensity<25, 25-caseDensity/15

    var colorPercentage;
    var r = 255;
    var g = 0;
    var b = 0;
    if (caseDensity > 10) {
        colorPercentage =  (25 - caseDensity)/15;
        g = colorPercentage * 196;
        fillColor = "rgb(" + r + "," + g + "," + b + ")";
    } else if (caseDensity <=10 && caseDensity>1) {
        r = 255;
        g = 255;
        b = 0;
        colorPercentage = caseDensity/10;
        r = r - colorPercentage * 255;
        fillColor = "rgb(" + r + "," + g + "," + b + ")";
    } else if (caseDensity <=1) {
        r = 255;
        g = 255;
        b = 0;
        fillColor = "#00FF00"
    }


    /*
  if (caseDensity > 25) {
<<<<<<< HEAD
    fillColor = rgb(255,0,0); //red
  }
  else if (caseDensity > 20) {
    fillColor = '#ff8000'; //dark orange
  }
=======
    fillColor = '#FF0000'; //red
  }
  else if (caseDensity > 20) {
    fillColor = '#ff8000'; //dark orange
  }
>>>>>>> fb4f57b495fc3d23eb9596f3b26cd657bc4b0a9f
  else if (caseDensity > 15) {
    fillColor = '#ff9500'; //orange
  }
  else if (caseDensity > 10) {
    fillColor = '#ffc400'; //dark yellow
  }
  else if (caseDensity > 5) {
    fillColor = '#f2ff00'; //light yellow
  }
  else if (caseDensity >= 1) {
    fillColor = '#a6ff00'; //light green
<<<<<<< HEAD
  }
=======
  }
>>>>>>> fb4f57b495fc3d23eb9596f3b26cd657bc4b0a9f
  else if (caseDensity < 1) {
    fillColor = '#00FF00'; //green
  };
  */

  return fillColor;
};

export default countyColor;
