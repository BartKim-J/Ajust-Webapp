import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import classNames from 'classnames';

// Images
import ImgCategoryButton from 'resource/Image/Common/Button/CategoryButton/CategoryBtn@3x.png';

import './CategoryButtons.scss';

class CategoryButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    const { clickHandler } = this.props;

    this.onClickHandler = clickHandler;
  }

  render() {
    const { selected, currentPath, buttonStats } = this.props;
    
    const Buttons = buttonStats.map((stats, idx) => {
      const ButtonClasses = classNames(`category-button${selected === idx ? '--selected' : ''}`);

      return (
        <Link key={stats.link} to={`${currentPath}/${stats.link}`}>
          <button
            type='button'
            id={`category-button-${idx}`}
            key={stats.link}
            onClick={() => this.onClickHandler(idx)}
            className={ButtonClasses}
          >
            <img src={ImgCategoryButton} alt={`button-${idx}`} />
            <div className="category-name">{stats.label}</div>
          </button>
        </Link>
      );
    });

    return <div className="category-button-box">{Buttons}</div>;
  }
}

CategoryButtons.propTypes = {
  selected: PropTypes.number.isRequired,
  currentPath: PropTypes.string.isRequired,

  clickHandler: PropTypes.func.isRequired,

  buttonStats: PropTypes.array,
}

CategoryButtons.defaultProps = {
  buttonStats: undefined,
}

export default CategoryButtons;
