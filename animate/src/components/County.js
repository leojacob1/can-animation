import React from 'react';
import ReactDOM from 'react-dom';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import countyColor from '../scripts/countyColor.js';


const County = ({geo, day, data}) => (
  <Geography
    key={geo.rsmKey}
    geography={geo}
    fill={countyColor(day, geo.id, data)}
    stroke="white"
    strokeWidth={0.3}
  />
);

export default County;
