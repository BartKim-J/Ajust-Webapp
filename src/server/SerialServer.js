// Http Express
const axios = require('axios')

// Serial Port
var PORT_PATH = 'n/a';
const BAUD_RATE = 115200;
const AJUSTY_PM = 'Microchip Technology Inc';

const AJUST_LOGIN_URL = 'http://18.182.122.117:8000/api/auth/login/';
const AJUSTER_POST_URL = 'http://18.182.122.117:8000/api/ajuster/';
//const POST_URL  = 'http://localhost:8000/api/ajuster/'

const SerialPort = require('serialport');
const Readline = require('@serialport/parser-readline');

const SUPER_USER = {
  username: "test0001",
  password: "test0000"
};

let USER_TOKEN = null;
let AUTH_HEADER = null;


console.log('\n$ Ajust Count Logger %\n');
console.log('HTTP REQUEST   >> Login');


function axiosErrorHandler(error) {
  if (error.response === undefined) {
    console.log(error);
    console.log("\nAJust server is offline.. retry connect to server\n");

    setTimeout(function () { ajustDongle(); }, 3000);
  } else {
    console.log(error);
  }
}

function listenDongle(port) {
  try {
    console.log(port);

    port.on('error', function (err) {
      console.error('serial port error!');
      console.error(err);
      return null;
    });
    port.on('close', function (err) {
      console.error('serial port close!');
      console.error(err);
      return null;
    });

    port.on('data', function (data) {
      var StartCode = data.substring(0, 1);
      var device_SN = parseInt(data.substring(1, 3));
      var device_Type = parseInt(data.substring(3, 4));
      var device_Group = device_Type;
      var device_Count = parseInt(data.substring(4, 8), 16);
      var EndCode = data.substring(8, 9);

      console.log(`HTTP REQUEST  >> [${StartCode}] Ajuser SN : ${device_SN}, Ajusty Type : ${device_Type}, Counted : ${device_Count} [${EndCode}]`);

      axios.post(AJUSTER_POST_URL, {
        device_SN: device_SN,
        device_Type: device_Type,
        device_Count: device_Count,
        group: device_Group,
      }, { headers: AUTH_HEADER })
        .then(function (response) {
          console.log(`HTTP RESPONSE << ${response.statusText}(${response.status})\n`);
          console.log(`RESULT   <> ajust couter log pushed on server successfully.\n`);
        }) // SUCCESS
        .catch(function (error) { axiosErrorHandler(error); }); //ERROR
    });
  } catch (exception) {
    console.log(exception);
  }
}

function ajustDongle() {
  axios.post(AJUST_LOGIN_URL, {
    username: SUPER_USER.username,
    password: SUPER_USER.password
  })
    .then(function (response) {
      console.log(`HTTP RESPONSE << ${response.statusText}(${response.status})\n`);
      console.log(`RESULT   <> ajust user login successfully.\n`);
      USER_TOKEN = response.data.token;
      AUTH_HEADER = {
        'Content-Type': "application/json",
        'Authorization': `token ${USER_TOKEN}`,
      };

      console.log('Researching ajuster dongle device...');
      SerialPort.list(function (err, ports) {
        var allports = ports.length;
        var count = 0;
        var done = false;
        ports.forEach(function (port) {
          count += 1;
          let pm = port['manufacturer'];

          console.log(port);
          if (typeof pm !== 'undefined' && pm.includes(AJUSTY_PM)) {
            PORT_PATH = port.comName.toString();

            console.log('...Researching ajuster dongle device successfully.\n');
            console.log('log recording start..\n');

            const ajustyPort = new SerialPort(PORT_PATH, { baudRate: BAUD_RATE });
            const parser = ajustyPort.pipe(new Readline({ delimiter: '\r\n' }));

            listenDongle(parser);
            done = true;
          }
          if (count === allports && done === false) {
            console.log('...Researching failed.\n');
            setTimeout(function () { ajustDongle(); }, 3000);
          }
        });
      });
    }).catch(function (error) { axiosErrorHandler(error); }); //ERROR
}


ajustDongle();
