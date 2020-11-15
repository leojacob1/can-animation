import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/MapSquare.css';
import FullMap from './FullMap.js';
import StateMap from './StateMap.js';
import dayToDate from '../scripts/dayToDate.js';

const MapSquareContainer = ({day, progress, startDay, endDay, startAnimation, data, state}) => (
      <div className="container" onClick={() => startAnimation()}>
    <p className="header">
    New cases
    </p>
    <p className="subHeader">
    per 100k people
    </p>
    <img className="color-key" src={process.env.PUBLIC_URL + "/horizontal-color-key.svg"} />

    {state &&
    <StateMap stateAbbrv={state} day={day} isHorizontal={false} data={data}/>
    }
    {!state &&
    <FullMap day={day} isHorizontal={false} data={data}/>
    }

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

export default MapSquareContainer;
