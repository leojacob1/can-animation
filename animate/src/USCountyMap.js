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
      fill={countyColor(this.props.day, this.props.geo.id, this.props.handleChange)}
      stroke="white"
      strokeWidth={0.3}
      />
  )
  }
}

class USCountyMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {day: 1}
  }


  componentDidMount() {
    this.myInterval = setInterval(() => {
      const day = this.state.day;
      if (day < 199) {
        this.setState({day: day + 3})
      } else {
        console.log(dayToDate(day));
        clearInterval(this.myInterval);
      }
    }, 10)
  }

  render() {
    let progress = 315 + ((this.state.day-15)/184)*273
    if (progress > 588) {
      progress = 588;
    }
    // } else if (progress < -31) {
    //   progress = -1430;
    // }
    return (
    <div className="container">
    <p className="header">
    New cases
    </p>
    <p className="subHeader">
    per 100k people
    </p>
    <img className="color-key" src={process.env.PUBLIC_URL + "/color-key-folder/vertical-color-key.svg"} />
    <p className={`twentyfive threshold ${this.state.valid ? '' : 'error'}`}>25</p>
    <p className={`ten threshold ${this.state.valid ? '' : 'error'}`}>10</p>
    <p className={`one threshold ${this.state.valid ? '' : 'error'}`}>1</p>
    <p className={`per100k ${this.state.valid ? '' : 'error'}`}>per 100k</p>

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
    <p className={`startDate timelineDate ${this.state.valid ? '' : 'error'}`} >Mar 1</p>
    <img className={`static timeline ${this.state.valid ? '' : 'error'}`} src={process.env.PUBLIC_URL + "/vertical-timeline.svg"} />
    <p className={`endDate timelineDate ${this.state.valid ? '' : 'error'}`}>Sep 1</p>
    <div className={`dateBox ${this.state.valid ? '' : 'error'}`} style={{top: progress + 'px'}}>
      <p className={'dateLabel'}>{`${dayToDate(this.state.day, true)}`}</p>
    </div>

      <img className="can-logo" src={process.env.PUBLIC_URL + "/can-logo-alt.svg"} />
      </div>
    )
  }
}

export default USCountyMap;
