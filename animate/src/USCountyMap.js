import React from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import countyColor from './countyColor.js';
import stateColor from './stateColor.js';
import dayToDate from './dayToDate.js';

import COUNTIES_JSON from './data/counties-10m.json';
import STATES_JSON from './data/states-10m.json';
import STATE_ABBRV from './data/stateAbbrv.json';

class County extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: "gray"}
  }
  render() {
    return (
      <Geography
      key={this.props.geo.rsmKey}
      geography={this.props.geo}
      fill={countyColor(this.props.day, this.props.geo.id, this.props.handleChange)}
      style={{"border-color": "red"}}
      strokeWidth={.1}
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
                <County geo={geo} day={this.state.day} handleChange={this.handleChange} opacity/>
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
