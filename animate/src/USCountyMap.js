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

      if (day < 163) {
        this.setState({day: this.state.day + 1})
      } else {
        clearInterval(this.myInterval);
      }
    }, 400)
  }

  render() {
    return (
    <div>
    <h1 style={{fontSize:5 + 'em', marginBottom: -5 + 'px'}}>
    {dayToDate(this.state.day).substring(5,7) + '/' + dayToDate(this.state.day).substring(8,10) + '/20'}
    </h1>
    <ComposableMap data-tip="" projection="geoAlbersUsa" stroke={'white'} style={{marginTop: -150 + 'px', width: 80+'%'}}>
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
      </div>
    )
  }
}

export default USCountyMap;
