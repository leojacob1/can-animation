import React from 'react';
import ReactDOM from 'react-dom';
import './Map.css';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import countyColor from './countyColor.js';
import dayToDate from './dayToDate.js';
import path from 'path';
import COUNTIES_JSON from './data/counties-10m.json';
import STATES_JSON from './data/states-10m.json';


class County extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: "gray", display: false};
  }
  render() {
    return (
      <Geography
      key={this.props.geo.rsmKey}
      geography={this.props.geo}
      fill={countyColor(this.props.day, this.props.geo.id)}
      stroke="white"
      strokeWidth={0.3}
      />
  )
  }
}

class USCountyMap extends React.Component {
  constructor(props) {
    super(props);
    this.startAnimation = this.startAnimation.bind(this);
    this.state = {day: 1}
  }


  startAnimation() {
    this.myInterval = setInterval(() => {
      const day = this.state.day;
      if (day < 215) { //days since 3/1 including end date
        this.setState({day: day + 1});
      } else {
        clearInterval(this.myInterval);
      }
    }, 10)
  }

  render() {
    const startPx = 147
    const endPx = 644
    let progress = startPx + ((this.state.day)/215)*(endPx-startPx) //days since 3/1 including end date
    if (progress > endPx) {
      progress = endPx;
    } else if (progress < startPx) {
      progress = startPx;
    }
    return (
      <div className="container">
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
              <County geo={geo} day={this.state.day} opacity/>
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
    <p className={`endDate timelineDate ${this.state.valid ? '' : 'error'}`}>Oct 1</p> //end date text
    <p className={`startDate timelineDate ${this.state.valid ? '' : 'error'}`} >Mar 1</p>

      <img className={`static timeline ${this.state.valid ? '' : 'error'}`} src={process.env.PUBLIC_URL + "/horizontal-timeline.svg"} />

      <div className={`dateBox ${this.state.valid ? '' : 'error'}`} style={{left: progress + 'px'}}>
        <p className={'dateLabel'}>{`${dayToDate(this.state.day, true)}`}</p>
      </div>
    </div>

      <img className="can-logo" src={process.env.PUBLIC_URL + "/can-logo-alt.svg"} />
      <button onClick={this.startAnimation} style={{opacity: 0, cursor: "none"}}>start animation</button>

      </div>

    )
  }
}

export default USCountyMap;
