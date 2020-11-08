import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/MapHorizontal.css';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import County from './County';
import dayToDate from '../scripts/dayToDate.js';
import COUNTIES_JSON from '../data/counties-10m.json';
import STATES_JSON from '../data/states-10m.json';




const MapHorizontal = ({day, progress, startAnimation, startDay, endDay}) => {
  console.log(progress)
  let progressPx = 315 + progress*(588 - 315)
  console.log(progressPx)
  return (
      <div className="container-horizontal">
    <p className="header-horizontal">
    New cases
    </p>
    <p className="subHeader-horizontal">
    per 100k people
    </p>
    <img className="color-key-horizontal" src={process.env.PUBLIC_URL + "/vertical-color-key.svg"} />
    <p className={`twentyfive threshold`}>25</p>
    <p className={`ten threshold`}>10</p>
    <p className={`one threshold`}>1</p>
    <p className={`per100k`}>per 100k</p>

    <div className="map-horizontal">
    <ComposableMap data-tip="" projection="geoAlbersUsa" >

      <Geographies geography={COUNTIES_JSON}>
        {({ geographies }) =>
          geographies.map(geo => {
            return (
              <County geo={geo} day={day} />
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
    <div className="timeline-box-horizontal">

    <p className={`endDate-horizontal timelineDate-horizontal`}>{dayToDate(endDay, true)}</p>
    <p className={`startDate-horizontal timelineDate-horizontal`}>{dayToDate(startDay, true)}</p>

      <img className={`static-horizontal timeline-horizontal`} src={process.env.PUBLIC_URL + "/horizontal-timeline.svg"} />

      <div className={`dateBox-horizontal`} style={{top: progressPx + 'px'}}>
        <p className={'dateLabel-horizontal'}>{`${dayToDate(day, true)}`}</p>
      </div>
    </div>

      <img className="can-logo-horizontal" src={process.env.PUBLIC_URL + "/can-logo-alt.svg"} />
      <button onClick={startAnimation} style={{opacity: 0, cursor: "none"}}>start animation</button>

      </div>

  )
}

export default MapHorizontal;
