import React from 'react';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import County from './County';
import STATE_CENTERS from '../data/us_state_centers';


const StateMap = ({stateAbbrv, day, isHorizontal, data}) => {
  const COUNTIES_JSON = require(`../data/countyTopoJson/${stateAbbrv}.json`);
  const stateInfo = STATE_CENTERS[stateAbbrv];
  return (
  <ComposableMap className={`${isHorizontal ? "map-horizontal" : "map"} state-map`} data-tip="" projection="geoMercator" style={{marginTop: "100px"}}projectionConfig={{
    roatation: stateInfo.rotate ? stateInfo.rotate: null,
    scale: stateInfo.scale ? stateInfo.scale : 4000,
  }}>
    <ZoomableGroup center={[stateInfo.Longitude, stateInfo.Latitude]}>
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
