// Standard Import
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

// Images
import ImgCategoryButton from 'resource/Image/Common/Button/CategoryButton/CategoryBtn@3x.png'

import './CategoryButtons.scss'

class CategoryButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    const _selected = this.props.selected;
    const _currentPath = this.props.currentPath;
    const _onClickHandler = this.props.clickHandler;

    const Buttons = this.props.buttonStats.map(function (stats, idx) {
      const ButtonClasses = classNames(
        `category-button${(_selected === idx) ? "--selected" : ""}`
      );
  
      return (
        <Link key={idx} to={`${_currentPath}/${stats.link}`}>
          <button
            id={`category-button-${idx}`}
            key={idx}
            onClick={() => _onClickHandler(idx)}
            className={ButtonClasses}
          >
            <img src={ImgCategoryButton} alt={`button-${idx}`} />
            <div className="category-name">{stats.label}</div>
          </button>
        </Link>
      )
    });
    
    return (
      <div className="category-button-box">
        {Buttons}
      </div>
    );
  }
}

export default CategoryButtons;
