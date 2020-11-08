import React from 'react';
import ReactDOM from 'react-dom';
import MapSquare from './MapSquare.js';
import MapHorizontal from './MapHorizontal.js';
import ControlPanel from './ControlPanel.js';
import { Grommet, Box, Select, Text, Form, FormField, DateInput, Button } from 'grommet';



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
      }
    }
  }

  handleFormSubmit(data) {
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
      }, 10)
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
      <div>
          {this.state.formData.dimension === "square" &&
            <MapSquare
              day={this.state.day}
              progress={progress}
              startDay={this.state.startDay}
              endDay={this.state.endDay}
            />
          }
          {this.state.formData.dimension === "horizontal" &&
            <MapHorizontal
              day={this.state.day}
              progress={progress}
              startDay={this.state.startDay}
              endDay={this.state.endDay}
            />
          }
        <ControlPanel handleSubmit={this.handleFormSubmit} />
        {this.state.formData.assetType === "animation" &&
          <Button primary label="Start Animation" onClick={() => this.startAnimation()} />
        }
      </div>
    )
  }
}

export default MapSelector;
