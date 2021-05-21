import React from 'react';
import ReactDOM from 'react-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import countyColor from '../scripts/countyColor.js';


const County = ({geo, geoId, day, data}) => (
  <Geography
    key={geo.rsmKey}
    geography={geo}
    fill={countyColor(day, geoId, data)}
    stroke="white"
    strokeWidth={0.1}
    strokeOpacity={1}
  />
);



export default County;
