import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { Link } from 'react-router-dom';

import ImgCategoryButton from 'resource/Images/Common/Button/CategoryButton/CategoryBtn@3x.png';

export default function CategoryButtons({ clickHandler, selected, currentPath, buttonStats }) {
  const Buttons = buttonStats.map((stats, idx) => {
    let ButtonClasses = 'category-button';

    if (idx === selected) {
      ButtonClasses += ' category-button-selected';
    }
    return (
      <Link key={stats.link} to={`${currentPath}/${stats.link}`}>
        <button
          type="button"
          id={`category-button-${idx}`}
          key={stats.link}
          onClick={() => clickHandler(idx)}
          className={ButtonClasses}
        >
          <img src={ImgCategoryButton} alt={`button-${idx}`} />
          <div className="category-name">{stats.label}</div>
        </button>
      </Link>
    );
  });

  return (
    <Styled.Wrap>
      <Styled.Container>{Buttons}</Styled.Container>
    </Styled.Wrap>
  );
}
CategoryButtons.propTypes = {
  selected: PropTypes.number.isRequired,
  currentPath: PropTypes.string.isRequired,

  clickHandler: PropTypes.func.isRequired,

  buttonStats: PropTypes.array,
};

CategoryButtons.defaultProps = {
  buttonStats: undefined,
};

const Styled = {};

Styled.Wrap = styled.div`
  position: relative;
`;

Styled.Container = styled.div`
  position: relative;
  top: 3.6px;

  max-height: 3.6em;
  button {
    outline: none;
    cursor: pointer;
  }

  img {
    height: 3.6em;
    max-height: 60px;
  }

  .category-button {
    z-index: 1000;
    position: relative;

    background: none;
    border: none;

    opacity: 0.6;

    transition-duration: 0.5s;

    padding: 0px 10px;

    .category-name {
      position: absolute;
      top: 25%;
      left: 50%;
      transform: translate(-50%, 0);

      font-size: 1.4em;

      color: white;
    }

    &:hover {
      transition-duration: 0.3s;
      opacity: 1;
    }
  }

  .category-button-selected {
    opacity: 1;
  }
`;
