import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import County from './County';
import COUNTIES_JSON from '../data/counties-10m.json';
import STATES_JSON from '../data/states-10m.json';

const FullMap = ({day, isHorizontal, data}) => (
  <ComposableMap className={isHorizontal ? "map-horizontal" : "map"} data-tip="" projection="geoAlbersUsa">

    <Geographies geography={COUNTIES_JSON}>
      {({ geographies }) =>
        geographies.map(geo => {
          return (
            <County geo={geo} geoId={geo.id} day={day} data={data} />
          );
        })
      }
    </Geographies>
    <Geographies geography={STATES_JSON}>
    {({ geographies }) =>
      geographies.map(geo => {
        return (
          <Geography
          key={geo.rsmKey}
          geography={geo}
          fill="teal"
          stroke="white"
          strokeWidth={1}
          fillOpacity={0}
          strokeOpacity={1}
          />
        );
      })
    }
    </Geographies>
  </ComposableMap>
);

export default FullMap;
