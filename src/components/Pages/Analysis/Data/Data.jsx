import React, { Component } from 'react';
import PropTypes from 'prop-types';
import 'shards-ui/dist/css/shards.min.css';

import CategoryButtons from 'components/Library/CategoryButtons/CategoryButtons';

import './Data.scss';

const buttonStats = [
  {
    label: 'Department',
    link: 'Department',
  },
  {
    label: 'Lab 1',
    link: 'Lab 1',
  },
  {
    label: 'Room 1',
    link: 'Room 1',
  },
  {
    label: 'Room 2',
    link: 'Room 2',
  },
];

class AnalysisData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: 0,
      currentPath: '/Analysis/Data',
    };

    this.onClickCategoryButtons = this.onClickCategoryButtons.bind(this);
  }

  componentDidMount() {
    const { history } = this.props;
    const { currentPath } = this.state;

    history.push(`${currentPath}/`);
  }

  onClickCategoryButtons(value) {
    this.setState({
      selected: value,
    });

    console.log(value);
  }

  render() {
    const { currentPath, selected } = this.state;

    return (
      <div className="data-section">
        <div className="data-inner">
          <div className="data-top-container" />

          <div className="data-bottom-container">
            <div className="button-box">
              <CategoryButtons
                buttonStats={buttonStats}
                currentPath={currentPath}
                selected={selected}
                clickHandler={this.onClickCategoryButtons}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AnalysisData.propTypes = {
  history: PropTypes.object.isRequired,
}

export default AnalysisData;
