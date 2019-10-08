/*
  @file: utils.js
  @auther: ben kim
  @email: jaehwankim07120@gmail.com

  @note
  @todo
  @debug
*/
import moment from 'moment-timezone';
import axios from 'axios';

const SUPER_USER = {
  username: 'ajustmin',
  password: 'ajust0000'
};

function pad(n, width) {
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
}

function getDailyData() {
  const TODAY = moment().tz('Asia/Seoul').format().substring(0, 10);
  const REALTIME = moment().tz('Asia/Seoul').format().substring(11, 13);
  const TOMMOROW = moment().tz('Asia/Seoul').add(1, 'days').format().substring(0, 10);
  const TZ_OFFSET = "+09:00";

  //let timeMap = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  let timeMap = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23];
  let ajustyMap = [];

  let DailyDatasets = [];
  let RealtimeDatasets = [];

  let dataByTime = Array(timeMap.length);
  let dataByTotal = 0;
  let dataByRealTime = 0;
  let dataByRealTimeData = [];

  //let ajusterLog = Array(timeMap.length);

  let UserInfo = {};
  let DailyResultData = {};
  let DailyResultStatus = {};


  axios.post('http://18.182.122.117:8000/api/auth/login/', {
    username: SUPER_USER.username,
    password: SUPER_USER.password,
  }).then(async response => {
    //FOR DEV ( SUPER USER LOGIN )
    const USER_TOKEN = response.data.token;
    const headers = {
      'Content-Type': "application/json",
      'Authorization': `token ${USER_TOKEN}`
    }
    ////////////////////////////////


      
    axios.get('http://18.182.122.117:8000/api/userInfo/', {
      params: {},
      headers: headers,
    }).then(async response => {
      UserInfo = response.data[0];


      axios.get('http://18.182.122.117:8000/api/ajusty/', {
        params: {},
        headers: headers,
      }).then(async response => {
        ajustyMap = response.data;

        const promises_axios = ajustyMap.map(async (ajusty, ajustyIndex) => {
          let dataByGroup = [];
          let logByGroup = [];

          await axios.get('http://18.182.122.117:8000/api/ajustyDailyView/', {
            params: {
              group: ajusty.id,
            },
            headers: headers,
          }).then(async response => {
            logByGroup = response.data;
          }).catch(response => {
            console.log(response);
          }); // ERROR

          console.log(logByGroup);

          const promises_axios = logByGroup.map(async (logs, hourIndex) => {
            dataByGroup[hourIndex] = logs.length;

            if (dataByTime[hourIndex] === undefined) dataByTime[hourIndex] = 0;
            dataByTime[hourIndex] += dataByGroup[hourIndex];

            //Correcting date by total
            dataByTotal += dataByGroup[hourIndex];
            if (hourIndex === parseInt(REALTIME)) {
              dataByRealTime += dataByGroup[hourIndex];

              if (logByGroup[hourIndex] !== undefined) {
                for (const log of logByGroup[hourIndex]) {
                  for (let min = 0; min < 60 / (2.5); min++) {
                    if (dataByRealTimeData[min] === undefined) {
                      dataByRealTimeData.splice(min, 0, 0);
                    }
                    if ((parseInt(log.pushed_at.substring(14, 16)) >= (min * (2.5))) &&
                      (parseInt(log.pushed_at.substring(14, 16)) < ((min * (2.5)) + (2.5)))) {
                      dataByRealTimeData.splice(min, 1, dataByRealTimeData[min] + 1);
                      //break;
                    }
                  }
                }
              }
            }

          });

          await Promise.all(promises_axios);

          console.log(dataByGroup);
          console.log(dataByTime);

          DailyDatasets[ajustyIndex] = {
            label: ajusty.name,

            fill: true,
            backgroundColor: function (context) {
              var index = context.dataIndex;
              var value = context.dataset.data[index];

              if (ajusty.optimal <= value) {
                return '#7ed321';
              } else if (ajusty.safe <= value) {
                return '#ff7700';
              } else {
                return '#ff0000';
              }
            },

            borderWidth: 1,
            borderColor: this.backgroundColor,

            data: dataByGroup
          };

          RealtimeDatasets[ajustyIndex] = {
            label: ajusty.name,

            fill: true,
            backgroundColor: function (context) {
              var index = context.dataIndex;
              var value = context.dataset.data[index];

              if (ajusty.optimal <= value) {
                return '#7ed321';
              } else if (ajusty.safe <= value) {
                return '#ff7700';
              } else {
                return '#ff0000';
              }
            },

            borderWidth: 1,
            borderColor: this.backgroundColor,

            data: dataByRealTimeData
          };
        });

        await Promise.all(promises_axios);

        DailyResultData = {
          type: 'bar',
          //labels: ["6:00~", "7:00~", "8:00~", "9:00~", "10:00~", "11:00~", "12:00~", "13:00~", "14:00~", "15:00~", "16:00~", "17:00~", "18:00~", "19:00~"],
          labels: ["1:00~", "2:00~", "3:00~", "4:00~", "5:00~", "6:00~", "7:00~", "8:00~", "9:00~", "10:00~", "11:00~", "12:00~", "13:00~", "14:00~", "15:00~", "16:00~", "17:00~", "18:00~", "19:00~", "20:00~", "21:00~", "22:00~", "23:00~", "24:00~"],
          datasets: DailyDatasets,
        };

        DailyResultStatus = {
          dataByTime: dataByTime,
          dataByTotal: dataByTotal,
          dataByRealTime: dataByRealTime,
          dataByRealTimeData: dataByRealTimeData,
        };

        if (this.onUpdateDailyResult !== undefined && this.onUpdateDailyStatus !== undefined) {
          this.onUpdateDailyResult(DailyResultData);
          this.onUpdateDailyStatus(DailyResultStatus);
          if (!this.state.isLoaded) {
            this.setState({
              UserInfo: UserInfo,
              isLoaded: true,
            });
          }
        } else {
          this.setState({
            DailyResultData: DailyResultData,
            DailyResultStatus: DailyResultStatus,
            UserInfo: UserInfo,
            isLoaded: true,
          });
        }
      }).catch(response => {
        console.log(response);
      }); // ERROR
    }).catch(response => {
      console.log(response);
    }); // ERROR
  }).catch(response => {
    console.log(response);
  }); // ERROR
}

export {
  pad,
  getDailyData,
}