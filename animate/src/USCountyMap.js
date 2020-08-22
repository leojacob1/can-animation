import React from 'react';
import ReactDOM from 'react-dom';
import './Map.css';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import countyColor from './countyColor.js';
import dayToDate from './dayToDate.js';
import path from 'path';
import COUNTIES_JSON from './data/counties-10m.json';

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
      strokeWidth={.5}
      />
  )
  }
}

class USCountyMap extends React.Component {
  constructor(props) {
    super(props);

    this.state = {day: 1, date: ''}
  }


  componentDidMount() {
    this.myInterval = setInterval(() => {
      const day = this.state.day;
      if (day < 175) {
        this.setState({day: this.state.day + 7})
      } else {
        clearInterval(this.myInterval);
      }
    }, 10)
  }

  render() {

    return (
    <div ref={this.componentRef}>
    <h1 className="header">
    New cases per 100k people
    </h1>
    <img src={process.env.PUBLIC_URL + "/color-key.png"} />
    <ComposableMap data-tip="" projection="geoAlbersUsa" stroke={'white'} style={{width: 80+'%'}}>
        <Geographies geography={COUNTIES_JSON}>
          {({ geographies }) =>
            geographies.map(geo => {
              return (
                <County geo={geo} day={this.state.day} opacity/>
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <img src={process.env.PUBLIC_URL + "/can-logo.png"} />
      </div>
    )
  }
}

export default USCountyMap;
