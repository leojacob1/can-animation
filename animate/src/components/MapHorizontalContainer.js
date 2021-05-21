import React from 'react';
import ReactDOM from 'react-dom';
import '../styles/MapHorizontal.css';
import FullMap from './FullMap.js';
import StateMap from './StateMap.js';
import dayToDate from '../scripts/dayToDate.js';

const MapHorizontalContainer = ({ day, progress, startDay, endDay, startAnimation, data, state }) => {
  let progressPx = 315 + progress*(588 - 315)

  return (
      <div className="container-horizontal" onClick={() => startAnimation()}>
    <p className="header-horizontal">
    New cases
    </p>
    <p className="subHeader-horizontal">
    per 100k people
    </p>
    <img className="color-key-horizontal" src={process.env.PUBLIC_URL + "/vertical-color-key.svg"} />
    {state &&
    <StateMap stateAbbrv={state} day={day} isHorizontal={true} data={data}/>
    }
    {!state &&
    <FullMap day={day} isHorizontal={true} data={data}/>
    }

    <div className="timeline-box-horizontal">

    <p className={`endDate-horizontal timelineDate-horizontal`}>{dayToDate(endDay, true)}</p>
    <p className={`startDate-horizontal timelineDate-horizontal`}>{dayToDate(startDay, true)}</p>

      <img className={`static-horizontal timeline-horizontal`} src={process.env.PUBLIC_URL + "/horizontal-timeline.svg"} />

      <div className={`dateBox-horizontal`} style={{top: progressPx + 'px'}}>
        <p className={'dateLabel-horizontal'}>{`${dayToDate(day, true)}`}</p>
      </div>
    </div>

      <img className="can-logo-horizontal" src={process.env.PUBLIC_URL + "/can-logo-alt.svg"} />

      </div>

  )
}

export default MapHorizontalContainer;
