import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/MapSquare.css';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import County from './County';
import dayToDate from '../scripts/dayToDate.js';
import COUNTIES_JSON from '../data/counties-10m.json';
import STATES_JSON from '../data/states-10m.json';




const MapSquare = ({day, progress, startDay, endDay, startAnimation, data}) => (
      <div className="container" onClick={() => startAnimation()}>
    <p className="header">
    New cases
    </p>
    <p className="subHeader">
    per 100k people
    </p>
    <img className="color-key" src={process.env.PUBLIC_URL + "/horizontal-color-key.svg"} />


    <div className="map">
    <ComposableMap data-tip="" projection="geoAlbersUsa" >

      <Geographies geography={COUNTIES_JSON}>
        {({ geographies }) =>
          geographies.map(geo => {
            return (
              <County geo={geo} day={day} data={data} />
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
            strokeWidth={0.5}
            fillOpacity={0}
            strokeOpacity={1}
            />
          );
        })
      }
      </Geographies>
    </ComposableMap>
    </div>
    <div className="timeline-box">

    <p className={`endDate timelineDate`}>{dayToDate(endDay, true)}</p> //end date text
    <p className={`startDate timelineDate`} >{dayToDate(startDay, true)}</p>

      <img className={`static timeline`} src={process.env.PUBLIC_URL + "/horizontal-timeline.svg"} />

      <div className={`dateBox`} style={{left: (147 + progress*(644 - 147)) + 'px'}}>
        <p className={'dateLabel'}>{`${dayToDate(day, true)}`}</p>
      </div>
    </div>

      <img className="can-logo" src={process.env.PUBLIC_URL + "/can-logo-alt.svg"} />

      </div>

);

export default MapSquare;
