/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)
'use strict';

var mraa = require("mraa");
var clientFromConnectionString = require('azure-iot-device-amqp').clientFromConnectionString;
var Message = require('azure-iot-device').Message;
var identity = require('./CreateIdentity'); //CHANGE THIS TO PASS INFORMATION TO CONNECTION STRING

var connectionString = "HostName=sample-temperature-app.azure-devices.net;DeviceId=myTempMonitorDevice;SharedAccessKey=vwEJ9BRkff/F3G8MGHuTp4oXcVPjYP637PmPXSwhhCw=";//OUR CONNECTION STRING SHOULD BE HOSTNAME,DEVICEID,DEVICE KEY -- WERE DEVICEID AND DEVICE KEY COME FROM IDENTITY I.E.IDENTITY.DEVICEID
var client = clientFromConnectionString(connectionString);

var fahrenheit_temperature = -1000;
var celsius_temperature = -1000;


//GROVE Kit A0 Connector --> Aio(0)
var myAnalogPin = new mraa.Aio(0);
var B = 3975;

function getTemp () { 
var a = myAnalogPin.read();
var resistance = (1023 - a) * 10000 / a; //get the resistance of the sensor;
celsius_temperature = 1 / (Math.log(resistance / 10000) / B + 1 / 298.15) - 273.15;//convert to temperature via datasheet
fahrenheit_temperature = (celsius_temperature * (9 / 5)) + 32;
console.log("Fahrenheit Temperature: " + fahrenheit_temperature);
};

var connectCallback = function (err) {
  if (err) {
    console.error('Could not connect: ' + err);
  } else {
    console.log('Client connected');
      
    setInterval(function() {
        getTemp();
        var message = new Message('Farenheit Temp: ' + fahrenheit_temperature + '\n' + 'Celsius Temp: ' + celsius_temperature);
        client.sendEvent(message, function (err) {
        if (err) console.log(err.toString());
        });
 
        client.on('message', function (msg) { 
            console.log(msg); 
            client.complete(msg, function () {
            console.log('completed');
            });
        }); 
    }, 5000);
  }
};

client.open(connectCallback);