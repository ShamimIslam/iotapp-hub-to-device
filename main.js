/**
 * @file
 * Retrieve data from the Microsoft Azure cloud service.
 * See the included README.md file for more information.
 *
 * <https://software.intel.com/en-us/xdk/docs/using-templates-nodejs-iot>
 *
 * @author Giselle Gomez, Intel Corporation
 * @author Anjali Gola, Intel Corporation
 *
 * @copyright (c) 2016-2017, Intel Corporation
 * @license BSD-3-Clause
 * See LICENSE.md for complete license terms and conditions.
 */

/* spec jslint and jshint lines for desired JavaScript linting */
/* see http://www.jslint.com/help.html and http://jshint.com/docs */
/* jslint node:true */
/* jshint unused:true */

"use strict" ;


var fs = require('fs');
var path = require('path');
// var Https = require('azure-iothub').Https;
// var Client = require('azure-iothub').Client;
var Registry = require('azure-iothub').Registry;
// var ConnectionString = require('azure-iothub').ConnectionString;
var _ = require('underscore');
var EventHubClient = require('azure-event-hubs').Client;

//parse in the information from our connection.json - to be used in connection string building
var connectString = JSON.parse(fs.readFileSync(path.join(__dirname, "connection.json")));

//This needs to be changed to match the connection string provided from YOUR hub - go into the connection.json to do so
var myConnectionString = "HostName=" + connectString.HOST_NAME + ";" + "SharedAccessKeyName=" + connectString.SHARE_ACCESS_NAME + ";" + "SharedAccessKey=" + connectString.FIRST_KEY + ";" ;
var deviceIndex = 1;
var startTime = Date.parse(2016-09-1);
//Get the list of all devices
getDevices(myConnectionString);
//Show a high level summary of all devices
//Monitor the event hub of a device at the given deviceIndex starting at the given start Time
//monitorDevice(deviceIndex, startTi

function monitorDevice(deviceList, deviceInd, startTime) {
    var device = deviceList[deviceIndex];
    var client = EventHubClient.fromConnectionString(myConnectionString);
    client
    .open()
    .then(client.getPartitionIds.bind(client))
    .then(function(partitionIds){
      return partitionIds.map(function(partId){
          return client.createReceiver('$Default', partId, {'startAfterTime': startTime})
          .then(function(receiver){
              receiver.on('errorReceived', function(error){
                  showError(error);
              });
              receiver.on('message', function(eventData){
                  if(eventData.systemProperties['iothub-connection-device-id'] === device.deviceId) {
                      console.log('Event : \n' + eventData.body + '\n');
                  }
              });

          });
      });
    })
    .catch(showError);
}

function getDevices(connString) {
  if (!connString) {
    showError('Missing connection string');
  }
  var registry = Registry.fromConnectionString(connString);
  registry.list(function(error, list){
    if(error) {
        showError(error);
    } else {
        showDevices(list);//promises cannot be made, so to ensure the device list is correct has to be made in the callback
        monitorDevice(list, deviceIndex, startTime);
    }
  });
}
function showDevices(devices) {
    _.each(devices, function(device){
        getDeviceDetail(device.deviceId, myConnectionString);
    });
}

function getHostName(str) {
    var txtchain = str.split(";");
    for (var strx in txtchain) {
        var txtbuck = txtchain[strx].split("=");
        if (txtbuck[0].toLowerCase() == "hostname")
            return txtchain[strx];
    }
    return "";
}
/*
 * Creates the device connection string and adds it to device object
 * Displays other interesting information about the device.
 *
*/

function getDeviceDetail(deviceId, connString) {
  if (!connString) {
    showError('Missing connection string');
  }
  if (!deviceId) {
    showError('No Device Id');
  }
  var requestString = getHostName(connString);
  requestString += ';DeviceId=' + deviceId;
  var registry = Registry.fromConnectionString(connString);
    registry.get(deviceId, function(error, device){
    if(error){
      showError(error);
    } else {
      requestString +=';SharedAccessKey' + device.authentication.SymmetricKey.primaryKey;
      device.connectionString = requestString;
      console.log('\n Device : '+ device.deviceId + '\t Last Activity Time : ' + device.lastActivityTime + '\t Status : ' + device.status + '\t Message count : ' + device.cloudToDeviceMessageCount) ;
    }
  });
}


function showError(err){
  console.log('ERROR' + err);
}

