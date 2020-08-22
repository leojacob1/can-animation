import React from 'react';
import ReactDOM from 'react-dom';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import styled from 'styled-components';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { exportComponentAsJPEG, exportComponentAsPDF, exportComponentAsPNG } from "react-component-export-image";
import GIFEncoder from 'gif-encoder-2';
import countyColor from './countyColor.js';
import stateColor from './stateColor.js';
import dayToDate from './dayToDate.js';
import fs from 'fs';
import path from 'path';

import COUNTIES_JSON from './data/counties-10m.json';
import STATES_JSON from './data/states-10m.json';
import STATE_ABBRV from './data/stateAbbrv.json';

const { createCanvas } = require('canvas');

// const ColorFadeCounty = styled.g`
//   fill: ${(props) => props.color};
//   transition: fill 1s ease-in;
//   onExited
// `;



class County extends React.Component {
  constructor(props) {
    super(props);
    this.state = {color: "gray", display: false};
  }
  render() {
    return (
      // <ColorFadeCounty color={countyColor(this.props.day, this.props.geo.id)}>
      <Geography
      key={this.props.geo.rsmKey}
      geography={this.props.geo}
      fill={countyColor(this.props.day, this.props.geo.id, this.props.handleChange)}
      strokeWidth={.5}
      />
      // </ColorFadeCounty>
  )
  }
}

class USCountyMap extends React.Component {
  constructor(props) {
    super(props);
    this.encoder = new GIFEncoder(600, 400);
    this.encoder.setDelay(500);
    this.encoder.start();
    this.componentRef = React.createRef();
    this.state = {day: 1, date: ''}
  }

  // clickHandler() {
  //   const day = this.state.day;
  //
  //   if (day < 125) {
  //     //exportComponentAsPNG(this.componentRef);
  //     //console.log("printing component for day", day);
  //     this.setState({day: this.state.day + 1})
  //   }
  // }

  componentDidMount() {
    // if (this.state.day < 125) {
    //   this.encoder.addFrame(this.componentRef);
    //   this.setState({day: this.state.day + 1});
    // } else {
    //   this.encoder.finish();
    //   const buffer = this.encoder.out.getData();
    //
    //   writeFile(path.join(__dirname, 'output', 'map.gif'), buffer, error => {
    //     console.log("buffer", buffer);
    //     console.log("error", error);
    //   });
    // }


    this.myInterval = setInterval(() => {
      const day = this.state.day;

      if (day < 5) {
        this.encoder.addFrame(this.componentRef);

        this.setState({day: this.state.day + 1})
      } else {
        this.encoder.finish();
        const buffer = this.encoder.out.getData();

        fs.writeFile(path.join(__dirname, 'output', 'map.gif'), buffer, error => {
          console.log("buffer", buffer);
          console.log("error", error);
        });
        clearInterval(this.myInterval);
      }
    }, 10)
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
