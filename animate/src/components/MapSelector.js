import React from 'react';
import ReactDOM from 'react-dom';
import MapSquare from './MapSquare.js';
import MapHorizontal from './MapHorizontal.js';
import ControlPanel from './ControlPanel.js';
import { Grommet, Box, Select, Text, Form, FormField, DateInput, Button } from 'grommet';
import ScaleLoader from "react-spinners/ScaleLoader";
import loadJson from '../scripts/loadJson';


class MapSelector extends React.Component {
  constructor(props) {
    super(props);
    this.startAnimation = this.startAnimation.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      day: null,
      formData: {
        dimension: null,
        assetType: null,
        dataType: null,
        startDate: null,
        endDate: null
      },
      isDataErr: false,
      data: null,
      isDataLoading: false,
    }
  }

  handleFormSubmit(data) {
    this.setState({ isDataLoading: true });
    loadJson((err, data) => {
      if (data) {
        this.setState({ data, isDataErr: false });
      } else if (err) {
        this.setState({ data: null, isDataErr: true });
      };
      this.setState({ isDataLoading: false });
    })

    var mar1 = new Date("03/01/2020");
    var startDate = new Date(data.startDate);
    var endDate = new Date(data.endDate)

    var startDay = Math.round((startDate.getTime() - mar1.getTime()) / (1000 * 3600 * 24)) + 1
    var endDay = Math.round((endDate.getTime() - mar1.getTime()) / (1000 * 3600 * 24)) + 1
    this.setState({
      formData: data,
      day: startDay,
      startDay: startDay,
      endDay: endDay
    })
  }

  startAnimation() {
    if (this.state.formData.assetType === "animation") {
      this.myInterval = setInterval(() => {
        const day = this.state.day;
        if (day < this.state.endDay) { //days since 3/1 including end date
          this.setState({day: day + 1});
        } else {
          clearInterval(this.myInterval);
        }
      }, 200)
    }
  }

  render() {
    let progress = (this.state.day - this.state.startDay) / (this.state.endDay - this.state.startDay)

    if (progress > 1) {
      progress = 1;
    } else if (progress < 0) {
      progress = 0;
    }


    return (
      <Box direction="row" justify="start">
          {(this.state.formData.dimension === "square" && this.state.data) &&
            <MapSquare
              day={this.state.day}
              progress={progress}
              startDay={this.state.startDay}
              endDay={this.state.endDay}
              startAnimation={this.startAnimation}
              data={this.state.data}
            />
          }
          {(this.state.formData.dimension === "horizontal"  && this.state.data) &&
            <MapHorizontal
              day={this.state.day}
              progress={progress}
              startDay={this.state.startDay}
              endDay={this.state.endDay}
              startAnimation={this.startAnimation}
              data={this.state.data}
            />
          }
          <Box direction="column" align="center" alignSelf="start">
        <ControlPanel
          handleSubmit={this.handleFormSubmit}
          startAnimation={this.state.formData.assetType === "animation" ? this.startAnimation : null}
          isDataLoaded={!!this.state.data}
        />
        {this.state.isDataErr &&
          <Text color="red">Error loading data</Text>
        }
        <ScaleLoader
          size={50}
          color={"#7D4CDB"}
          loading={this.state.isDataLoading}
        />
        {this.state.isDataLoading &&
          <Text>Map is loading...</Text>
        }
        </Box>
      </Box>
    )
  }
}

export default MapSelector;
