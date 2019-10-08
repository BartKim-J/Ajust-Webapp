// Standard Import
import React, { Component } from 'react';

// NPM Import
import { Bar } from 'react-chartjs-2';

//Redux
//import { connect } from 'react-redux';
//import {  } from 'actions'

// Style Sheets
import './GroupList.scss';

const BarChartOptions = {
  maintainAspectRatio: false,
  legend: {
    display: false,
    labels: {
      fontColor: '#ffffff'
    },
  },
  responsive: true,
  title: {
    display: false,
    text: 'Pie Chart Title'
  },
  scales: { //X,Y axis options
    xAxes: [{
      stacked: true,
      display: true,
      gridLines: {
        color: "#ffffff",
        borderDash: [4, 8],
      },
      scaleLabel: {
        display: true,
        labelString: "Hour",
        fontColor: "#ffffff"
      },
      ticks: {
        fontColor: "#ffffff",
        beginAtZero: true,
      },
    }],
    yAxes: [{
      stacked: true,
      display: true,
      gridLines: {
        color: "#ffffff",
        borderDash: [4, 8],
      },
      scaleLabel: {
        display: true,
        labelString: "Count",
        fontColor: "#ffffff"
      },
      ticks: {
        fontColor: "#ffffff",
        beginAtZero: true,
      },
    }]
  }
};

var chartReference = [];

class GroupList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartReference: []
    };

  }

  componentDidMount() {
    //const timerId = setInterval(async () => {  
    setInterval(async () => {  
      //console.log(chartReference); // returns a Chart.js instance reference
      chartReference.map((chartReference, idx) => {
        let BarChartInstance = undefined
        if(chartReference)
        {
          BarChartInstance = chartReference.chartInstance
          
          BarChartInstance.update();
        }

        return null;
      })
    }, 3000);
  }

  shouldComponentUpdate(nextProps, nextState){
   
    return false;
  }

  render() {
    const GroupChartBoxs = this.props.GroupDatas.map(function (data, idx) {
      const groupData = {
        type: 'bar',
        //labels: ["6:00", "7:00", "8:00", "9:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"],
        labels: ["1:00~", "2:00~", "3:00~", "4:00~", "5:00~", "6:00~", "7:00~", "8:00~", "9:00~", "10:00~", "11:00~", "12:00~", "13:00~", "14:00~", "15:00~", "16:00~", "17:00~", "18:00~", "19:00~", "20:00~", "21:00~", "22:00~", "23:00~",  "24:00~"],
        datasets: [data],
      }

      return (
          <div key={idx} id={idx} className="group-list-chart">
            <div className="group-list-chart-title">
              {data.label}
            </div>

            <Bar
              ref={(reference) => chartReference[idx] = reference }
              data={groupData}
              options={BarChartOptions}
              redraw
            />
          </div>
      )
    });

    return (
      <div className="group-list-container">
        <div className="group-list-inner">
          <div className="group-list-chart-box">
            {GroupChartBoxs}
          </div>
        </div>
      </div>
    );
  }
}

export default GroupList;