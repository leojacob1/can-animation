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
      //stroke="black"
      strokeWidth={0.1}
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
      if (day < 200) {
        this.setState({day: this.state.day + 3})
      } else {
        clearInterval(this.myInterval);
      }
    }, 10)
  }

  render() {

    return (
    <div className="container">
    <h1 className="header">
    New cases per 100k people
    </h1>
    <img className="color-key" src={process.env.PUBLIC_URL + "/color-key.png"} />
    <ComposableMap clasName="map" data-tip="" projection="geoAlbersUsa" stroke={'white'} style={{width: 65+'%'}}>

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
            stroke="black"
            strokeWidth={1}
            fillOpacity={0}
            strokeOpacity={0.5}
            />
          );
        })
      }
      </Geographies>
    </ComposableMap>
      <h1 className="date">
      {`${dayToDate(this.state.day).substring(5,7)}/${dayToDate(this.state.day).substring(8,10)}/20`}
      </h1>
      <img className="can-logo" src={process.env.PUBLIC_URL + "/can-logo.png"} />
      <img className="Timeline_No_Slider" src={process.env.PUBLIC_URL + "/Timeline_No_Slider.png"}/>
      <img className="Timeline_Slider" src={process.env.PUBLIC_URL + "/Timeline_Slider.png"}
      style={{
            position: 'absolute',
            top: 650,
            left: 203 + ((this.state.day/219)*480),
          }}
        />
      </div>
    )
  }
}

export default USCountyMap;
