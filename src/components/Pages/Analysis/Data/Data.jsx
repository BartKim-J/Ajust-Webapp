// Standard Import
import React, { Component } from 'react';
//import { Route } from 'react-router-dom';

// Standard Stylesheet
import "shards-ui/dist/css/shards.min.css"

// Components
import CategoryButtons from 'components/Library/CategoryButtons/CategoryButtons'


// Style Sheets
import './Data.scss';

const buttonStats = [
  {
    label: "Department", 
    link:  "Department"
  },
  {
    label: "Lab 1",
    link:  "Lab 1"
  },
  {
    label: "Room 1",
    link:  "Room 1"
  },
  {
    label: "Room 2",
    link:  "Room 2"
  }
];


class AnalysisData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      currentPath: "/Analysis/Data",
    }

    this.onClickCategoryButtons = this.onClickCategoryButtons.bind(this);
  }

  componentDidMount() {
    this.props.history.push(`${this.state.currentPath}/`);
  }

  onClickCategoryButtons(value)
  {
    this.setState({
      selected: value,
    });

    console.log(value)
  }

  render() {
    const currentPath = this.state.currentPath;

    return (
      <div className="data-section">
        <div className="data-inner">
          <div className="data-top-container">
          </div>

          <div className="data-bottom-container">
            <div className="button-box">
              <CategoryButtons 
                buttonStats={buttonStats}
                currentPath={currentPath}
                selected={this.state.selected}
                clickHandler={this.onClickCategoryButtons}
              />
            </div>

          </div>
        </div>
      </div>
    );
  }
}

export default AnalysisData;