import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import countyColor from './countyColor.js';
import stateColor from './stateColor.js';
import dayToDate from './dayToDate.js';


import COUNTIES_JSON from './data/counties-10m.json';
import STATES_JSON from './data/states-10m.json';
import STATE_ABBRV from './data/stateAbbrv.json';

class State extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: "gray"}
  }

  // async componentDidMount() {
  //   // var abbrv = STATE_ABBRV[this.props.geo.properties.name]
  //   // abbrv = abbrv ? abbrv : this.props.geo.properties.name
  //   // const color = await stateColor(abbrv);
  //   // if (color) {
  //   //   this.setState({color: color })
  //   // }
  //
  //   this.setState({color: countyColor(this.props.geo.id)})
  // }
  render() {
    return (
      <Geography
      key={this.props.geo.rsmKey}
      geography={this.props.geo}
      fill={countyColor(this.props.day, this.props.geo.id, this.props.handleChange)}
    />
  )
  }

}

class USCountyMap extends React.Component {
  constructor(props) {
    super(props);
    //this.handleChange = this.handleChange.bind(this);
    this.state = {day: 1, date: ''}
  }

  // handleChange(date) {
  //   this.setState({date: date})
  // }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const day = this.state.day;

      if (day < 194) {
        this.setState({day: this.state.day + 1})
      } else {
        clearInterval(this.myInterval);
      }
    }, 400)
  }

  render() {
    return (
    <div>
    <ComposableMap data-tip="" projection="geoAlbersUsa" stroke={'white'}>
        <Geographies geography={COUNTIES_JSON}>
          {({ geographies }) =>
            geographies.map(geo => {
              return (
                <State geo={geo} day={this.state.day} handleChange={this.handleChange}/>
              );
            })
          }
        </Geographies>
      </ComposableMap>
      <p>{dayToDate(this.state.day)}</p>
      </div>
    )
  }
}

export default USCountyMap;
