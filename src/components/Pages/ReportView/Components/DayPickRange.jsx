import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import mediaConf from 'configure/mediaConfig';

import DatePicker from 'react-datepicker';

import './Stylesheet/react-datepicker.scss';

export class DayPickRange extends PureComponent {
  constructor(props) {
    super(props);

    this.handleChangeStart = this.handleChangeStart.bind(this);
    this.handleChangeEnd = this.handleChangeEnd.bind(this);
  }

  handleChangeStart(startDate) {
    const { onDateChange, dateRange } = this.props;
    onDateChange(startDate, dateRange.endDate);
  }

  handleChangeEnd(endDate) {
    const { onDateChange, dateRange } = this.props;
    onDateChange(dateRange.startDate, endDate);
  }

  render() {
    const { dateRange } = this.props;

    return (
      <Styled.Wrap>
        <Styled.Container>
          <Styled.StartDate>
            <DatePicker
              selected={dateRange.startDate}
              selectsStart
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onChange={this.handleChangeStart}
              popperPlacement="auto-right"
            />
          </Styled.StartDate>
          <Styled.EndDate>
            <DatePicker
              selected={dateRange.endDate}
              selectsEnd
              startDate={dateRange.startDate}
              endDate={dateRange.endDate}
              onChange={this.handleChangeEnd}
              minDate={dateRange.startDate}
              popperPlacement="auto-right"
            />
          </Styled.EndDate>
        </Styled.Container>
      </Styled.Wrap>
    );
  }
}

DayPickRange.propTypes = {
  dateRange: PropTypes.object.isRequired,
  onDateChange: PropTypes.func.isRequired,
};

export default DayPickRange;

const Styled = {};

Styled.Wrap = styled.div`
  position: relative;
  width: 100%;
`;

Styled.Container = styled.div`
  position: relative;
  width: 100%;

  input {
    width: 6vw;
    max-width: 125px;

    height: 3vh;

    border: none;
    outline: none;

    font-size: 0.6vw;
    font-family: 'S-CoreDream-5';
    text-align: center;
    line-height: 3vh;
    vertical-align: middle;

    @media all and (min-width: ${mediaConf.MEDIA_WIDTH_DESKTOP_CONTENT}) {
      font-size: 10px;
    }

    background-color: #51565d;
    color: #a5aab3;

    cursor: pointer;
  }
`;

Styled.StartDate = styled.span`
  width: 45%;

  input {
    border-radius: 1vw 0px 0px 1vw;
  }
`;

Styled.EndDate = styled.span`
  width: 45%;

  input {
    border-radius: 0px 1vw 1vw 0px;
  }
`;
