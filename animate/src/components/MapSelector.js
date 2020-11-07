import React from 'react';
import ReactDOM from 'react-dom';
import MapSquare from './MapSquare.js';
import MapHorizontal from './MapHorizontal.js';
import ControlPanel from './ControlPanel.js';


class MapSelector extends React.Component {
  constructor(props) {
    super(props);
    this.startAnimation = this.startAnimation.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    console.log("constructor")
    this.state = {
      day: 1,
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
    console.log("handleFormSubmit", data)
    this.setState({formData: data}, () => {
      console.log("new state set:", this.state.formData.dimension)
    })
  }

  startAnimation() {
    this.myInterval = setInterval(() => {
      const day = this.state.day;
      if (day < 229) { //days since 3/1 including end date
        this.setState({day: day + 1});
      } else {
        clearInterval(this.myInterval);
      }
    }, 10)
  }

  render() {
    if(this.state.formData) {
      console.log(this.state.formData.dimension)
    } else {
      console.log("No form data!")
    }
    const startPx = 147
    const endPx = 644
    let progress = startPx + ((this.state.day)/229)*(endPx-startPx)

    if (progress > endPx) {
      progress = endPx;
    } else if (progress < startPx) {
      progress = startPx;
    }


    return (
      <div>
          {this.state.formData.dimension === "square" &&
            <MapSquare
              day={this.state.day}
              progress={this.state.progress}
              startAnimation={this.startAnimation}
            />
          }
          {this.state.formData.dimension === "horizontal" &&
            <MapHorizontal
              day={this.state.day}
              progress={this.state.progress}
              startAnimation={this.startAnimation}
            />
          }
        <ControlPanel handleSubmit={this.handleFormSubmit} />
      </div>
    )
  }
}

export default MapSelector;
