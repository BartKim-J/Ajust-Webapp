// Standard Import
import React, { Component } from 'react';

// NPM Import
import { Doughnut } from 'react-chartjs-2';
import DayPickRange from './DayPickRange'

// Style Sheets
import './Stylesheet/RangePieChart.scss';

const PieChartOptions = {
  maintainAspectRatio: false,
  legend: { display: false },
  responsive: true,
  title: {
    display: false,
    text: 'Bar Chart Title'
  },
  animation: {
    duration: 0
  }, 
  scales: { //X,Y축 옵션
    yAxes: [{
      display: false //this will remove all the x-axis grid lines
    }],
    xAxes: [{
      display: false //this will remove all the x-axis grid lines
    }]

  },
};

class RangePieChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };

    this.onDateChange = this.onDateChange.bind(this);
  }

  componentDidMount() {

  }
  
  onDateChange(startDate, endDate) {
    const dateRange = {
      startDate: startDate,
      endDate: endDate
    };

    this.props.dateChange(dateRange); 
  }

  render() {
    return (
      <div className="pie-chart">
        <div className="title">
          {this.props.title}
                  <div className="daypicker">
            <DayPickRange
              dateRange={this.props.dateRange}
              onDateChange={this.onDateChange}
            />
          </div>
        </div>
        <div className="pie-chart">
          <Doughnut
            data={this.props.data}
            options={PieChartOptions}
          />
        </div>
      </div >
    );
  }
}

export default RangePieChart;