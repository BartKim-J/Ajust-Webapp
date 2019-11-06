import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import mediaConf from 'configure/mediaConfig';

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
  width: 100%;

`;

Styled.Container = styled.div`
  position: relative;

  .category-button {
    position: relative;

    z-index: 1000;

    width: 16vw;
    max-width: 238px;

    img {
      width: 100%;
    }

    background: none;
    border: none;

    opacity: 0.6;

    transition-duration: 0.5s;

    padding: 0px 1%;

    .category-name {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -35%);

      font-size: 0.8vw;
      font-family: 'S-CoreDream-5';
      color: #ffffff;

      @media all and (min-width: ${mediaConf.MEDIA_WIDTH_DESKTOP_CONTENT}) {
        font-size: 14px;
      }
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
