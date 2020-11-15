import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import County from './County';
import STATE_CENTERS from '../data/us_state_centers';


const StateMap = ({state, day, isHorizontal, data}) => {
  const COUNTIES_JSON = require(`../data/countyTopoJson/${state}.json`);
  const state_center = STATE_CENTERS[state];
  return (
  <ComposableMap className={isHorizontal ? "map-horizontal" : "map"} data-tip="" projection="geoMercator" projectionConfig={{scale: 5500}}>
    <ZoomableGroup center={[state_center.Longitude, state_center.Latitude]} disablePanning={true}>
    <Geographies geography={COUNTIES_JSON}>
      {({ geographies }) =>
        geographies.map(geo => {
          return (
            <County geo={geo} geoId={geo.properties.GEOID} day={day} data={data}/>
          );
        })
      }
    </Geographies>
    </ZoomableGroup>
  </ComposableMap>
  );
}

export default StateMap;
