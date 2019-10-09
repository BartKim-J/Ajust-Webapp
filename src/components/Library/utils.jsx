/* eslint-disable no-unused-vars */
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
  password: 'ajust0000',
};

function pad(n, width) {
  let number = n;

  number += '';
  return number.length >= width ? number : new Array(width - number.length + 1).join('0') + number;
}

function getDailyData() {
  const TODAY = moment()
    .tz('Asia/Seoul')
    .format()
    .substring(0, 10);
  const REALTIME = moment()
    .tz('Asia/Seoul')
    .format()
    .substring(11, 13);
  const TOMMOROW = moment()
    .tz('Asia/Seoul')
    .add(1, 'days')
    .format()
    .substring(0, 10);
  const TZ_OFFSET = '+09:00';

  // let timeMap = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
  const timeMap = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
  ];
  let ajustyMap = [];

  const DailyDatasets = [];
  const RealtimeDatasets = [];

  const dataByTime = Array(timeMap.length);
  let dataByTotal = 0;
  let dataByRealTime = 0;
  const dataByRealTimeData = [];

  // let ajusterLog = Array(timeMap.length);

  let UserInfo = {};
  let DailyResultData = {};
  let DailyResultStatus = {};

  axios
    .post('http://18.182.122.117:8000/api/auth/login/', {
      username: SUPER_USER.username,
      password: SUPER_USER.password,
    })
    .then(async response => {
      // FOR DEV ( SUPER USER LOGIN )
      const USER_TOKEN = response.data.token;
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `token ${USER_TOKEN}`,
      };
      // //////////////////////////////

      axios
        .get('http://18.182.122.117:8000/api/userInfo/', {
          params: {},
          headers,
        })
        .then(async UserInfoResponse => {
          [ UserInfo, ] = UserInfoResponse.data;
          
          console.log(UserInfo);

          axios
            .get('http://18.182.122.117:8000/api/ajusty/', {
              params: {},
              headers,
            })
            .then(async AjustyResponse => {
              ajustyMap = AjustyResponse.data;

              const promisesAxiosAjusty = ajustyMap.map(async (ajusty, ajustyIndex) => {
                const dataByGroup = [];
                let logByGroup = [];

                await axios
                  .get('http://18.182.122.117:8000/api/ajustyDailyView/', {
                    params: {
                      group: ajusty.id,
                    },
                    headers,
                  })
                  .then(async AjustyDailyViewResponse => {
                    logByGroup = AjustyDailyViewResponse.data;
                  })
                  .catch(error => {
                    console.log(error);
                  }); // ERROR

                const promisesAxiosAjustyLog = logByGroup.map(async (logs, hourIndex) => {
                  dataByGroup[hourIndex] = logs.length;

                  if (dataByTime[hourIndex] === undefined) dataByTime[hourIndex] = 0;
                  dataByTime[hourIndex] += dataByGroup[hourIndex];

                  // Correcting date by total
                  dataByTotal += dataByGroup[hourIndex];
                  if (hourIndex === parseInt(REALTIME, 10)) {
                    dataByRealTime += dataByGroup[hourIndex];

                    if (logByGroup[hourIndex] !== undefined) {
                      logByGroup[hourIndex].forEach((log) => {
                        for (let min = 0; min < 60 / 2.5; min += 1) {
                          if (dataByRealTimeData[min] === undefined) {
                            dataByRealTimeData.splice(min, 0, 0);
                          }
                          if (
                            parseInt(log.pushed_at.substring(14, 16), 10) >= min * 2.5 &&
                            parseInt(log.pushed_at.substring(14, 16), 10) < min * 2.5 + 2.5
                          ) {
                            dataByRealTimeData.splice(min, 1, dataByRealTimeData[min] + 1);
                            // break;
                          }
                        }
                      })
                    }
                  }
                });

                await Promise.all(promisesAxiosAjustyLog);

                DailyDatasets[ajustyIndex] = {
                  label: ajusty.name,

                  fill: true,
                  backgroundColor(context) {
                    const index = context.dataIndex;
                    const value = context.dataset.data[index];

                    if (ajusty.optimal <= value) {
                      return '#7ed321';
                    }
                    if (ajusty.safe <= value) {
                      return '#ff7700';
                    }
                    return '#ff0000';
                  },

                  borderWidth: 1,
                  borderColor: this.backgroundColor,

                  data: dataByGroup,
                };

                RealtimeDatasets[ajustyIndex] = {
                  label: ajusty.name,

                  fill: true,
                  backgroundColor(context) {
                    const index = context.dataIndex;
                    const value = context.dataset.data[index];

                    if (ajusty.optimal <= value) {
                      return '#7ed321';
                    }
                    if (ajusty.safe <= value) {
                      return '#ff7700';
                    }
                    return '#ff0000';
                  },

                  borderWidth: 1,
                  borderColor: this.backgroundColor,

                  data: dataByRealTimeData,
                };
              });

              await Promise.all(promisesAxiosAjusty);

              DailyResultData = {
                type: 'bar',
                // labels: ["6:00~", "7:00~", "8:00~", "9:00~", "10:00~", "11:00~", "12:00~", "13:00~", "14:00~", "15:00~", "16:00~", "17:00~", "18:00~", "19:00~"],
                labels: [
                  '1:00~',
                  '2:00~',
                  '3:00~',
                  '4:00~',
                  '5:00~',
                  '6:00~',
                  '7:00~',
                  '8:00~',
                  '9:00~',
                  '10:00~',
                  '11:00~',
                  '12:00~',
                  '13:00~',
                  '14:00~',
                  '15:00~',
                  '16:00~',
                  '17:00~',
                  '18:00~',
                  '19:00~',
                  '20:00~',
                  '21:00~',
                  '22:00~',
                  '23:00~',
                  '24:00~',
                ],
                datasets: DailyDatasets,
              };

              DailyResultStatus = {
                dataByTime,
                dataByTotal,
                dataByRealTime,
                dataByRealTimeData,
              };

              if (
                this.onUpdateDailyResult !== undefined &&
                this.onUpdateDailyStatus !== undefined
              ) {
                this.onUpdateDailyResult(DailyResultData);
                this.onUpdateDailyStatus(DailyResultStatus);
                if (!this.state.isLoaded) {
                  this.setState({
                    UserInfo,
                    isLoaded: true,
                  });
                }
              } else {
                this.setState({
                  DailyResultData,
                  DailyResultStatus,
                  UserInfo,
                  isLoaded: true,
                });
              }
            })
            .catch(error => {
              console.log(error);
            }); // ERROR
        })
        .catch(error => {
          console.log(error);
        }); // ERROR
    })
    .catch(error => {
      console.log(error);
    }); // ERROR
}

export { pad, getDailyData };
