import React from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import styled from 'styled-components';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from "react-component-export-image";
import countyColor from './countyColor.js';
import stateColor from './stateColor.js';
import dayToDate from './dayToDate.js';

import COUNTIES_JSON from './data/counties-10m.json';
import STATES_JSON from './data/states-10m.json';
import STATE_ABBRV from './data/stateAbbrv.json';

const ColorFadeCounty = styled.g`
  fill: ${(props) => props.color};
  transition: fill 2s ease-in;
`;

class County extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: "gray", display: false}
  }
  render() {
    return (
      <ColorFadeCounty color={countyColor(this.props.day, this.props.geo.id)}>
      <Geography
      key={this.props.geo.rsmKey}
      geography={this.props.geo}
      //fill={countyColor(this.props.day, this.props.geo.id, this.props.handleChange)}
      strokeWidth={.5}
      />
      </ColorFadeCounty>
  )
  }
}

class USCountyMap extends React.Component {
  constructor(props) {
    super(props);
    this.componentRef = React.createRef();
    this.state = {day: 1, date: ''}
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      const day = this.state.day;

      if (day < 125) {
        //exportComponentAsPNG(this.componentRef);
        //console.log("printing component for day", day);
        this.setState({day: this.state.day + 1})
      } else {
        clearInterval(this.myInterval);
      }
    }, 1000)
  }

  render() {
    return (
    //<React.Fragment>
    <div ref={this.componentRef}>
    <h1 style={{fontSize:5 + 'em'}}>
    {dayToDate(this.state.day).substring(5,7) + '/' + dayToDate(this.state.day).substring(8,10) + '/20'}
    </h1>
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
      </div>
      //</React.Fragment>
    )
  }
}

// class USCountyMap extends React.Component {
//   constructor(props) {
//     super(props);
//     this.componentRef = React.createRef();
//   }
//
//   componentDidMount() {
//     exportComponentAsPNG(this.componentRef);
//   }
//
//   render() {
//
//     return (
//       <React.Fragment>
//         <MapToPrint ref={this.componentRef} />
//        //  <button onClick={() => exportComponentAsPNG(this.componentRef)}>
//        //     Export As PNG
//        // </button>
//       </React.Fragment>
//     );
//   }
// }
//
export default USCountyMap;


// class ComponentToPrint extends React.Component {
//  render() {
//    return <div>Hello World</div>;
//  }
// }
// export default class USCountyMap extends React.Component {
//  constructor(props) {
//    super(props);
//    this.componentRef = React.createRef();
//  }
//
//  render() {
//    return (
//    <React.Fragment>
//        <ComponentToPrint ref={this.componentRef} />
//        <button onClick={() => exportComponentAsJPEG(this.componentRef)}>
//            Export As JPEG
//        </button>
//        <button onClick={() => exportComponentAsPDF(this.componentRef)}>
//            Export As PDF
//        </button>
//        <button onClick={() => exportComponentAsPNG(this.componentRef)}>
//            Export As PNG
//        </button>
//    </React.Fragment>);
//  }
// }
