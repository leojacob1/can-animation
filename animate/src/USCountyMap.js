import React from 'react';
import ReactDOM from 'react-dom';
import './Map.css';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import stateColor from './countyColor.js';
import dayToDate from './dayToDate.js';
import path from 'path';
import COUNTIES_JSON from './data/counties-10m.json';
import STATES_JSON from './data/states-10m.json';


class State extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: "gray", display: false};
  }
  render() {
    return (
      <Geography
      key={this.props.geo.rsmKey}
      geography={this.props.geo}
      fill={stateColor(this.props.day, this.props.geo.id, this.props.handleChange)}
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

    this.state = {day: 154, complete: false} //1 = march 1

  }


  startAnimation() {
    console.log("startAnimation")
    this.myInterval = setInterval(() => {
      const day = this.state.day;

      if (day < 240) { //days since mar 1
        console.log("set new day")
        this.setState({day: day + 1});
      } else {
        console.log("clear interval")
        clearInterval(this.myInterval);
      }
    }, 175)
  }

  render() {

    let progress = 315 + ((this.state.day)/240)*273 //days since mar 1

    if (progress > 588) {
      progress = 588;
    }
    // } else if (progress < -31) {
    //   progress = -1430;
    // }
    return (
      <div className="container">
    <p className="header">
    Infection Rate
    </p>

    <img className="color-key" src={process.env.PUBLIC_URL + "/color-key-folder/vertical-color-key.svg"} />
    <p className={`twentyfive threshold ${this.state.valid ? '' : 'error'}`}>1.4</p>
    <p className={`ten threshold ${this.state.valid ? '' : 'error'}`}>1.1</p>
    <p className={`one threshold ${this.state.valid ? '' : 'error'}`}>0.9</p>

    <div className="map">
    <ComposableMap data-tip="" projection="geoAlbersUsa" >

      <Geographies geography={STATES_JSON}>
        {({ geographies }) =>
          geographies.map(geo => {
            return (
              <State geo={geo} day={this.state.day} opacity/>
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
    <p className={`startDate timelineDate ${this.state.valid ? '' : 'error'}`} >Mar 1</p>
    <img className={`static timeline ${this.state.valid ? '' : 'error'}`} src={process.env.PUBLIC_URL + "/vertical-timeline.svg"} />
    <p className={`endDate timelineDate ${this.state.valid ? '' : 'error'}`}>Oct 26</p>
    <div className={`dateBox ${this.state.valid ? '' : 'error'}`} style={{top: progress + 'px'}}>
      <p className={'dateLabel'}>{`${dayToDate(this.state.day, true)}`}</p>
    </div>

      <img className="can-logo" src={process.env.PUBLIC_URL + "/can-logo-alt.svg"} />
      <button onClick={this.startAnimation} style={{opacity: 0, cursor: "none"}}>Start</button>

      </div>

    )
  }
}

export default USCountyMap;
