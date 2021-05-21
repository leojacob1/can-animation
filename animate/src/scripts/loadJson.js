import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

const url = "https://content.covidactnow.org/animap/county-history-data.json";

const settings = { method: "Get" };

const loadJson = (callback) => {
  fetch(url, settings)
      .then(res => res.json())
      .then((data) => {
        console.log("loading data");
        callback(null, data);
      })
      .catch((err) => {
        console.log("err loading data", err);
        callback(err, null);
      });
}

export default loadJson;
