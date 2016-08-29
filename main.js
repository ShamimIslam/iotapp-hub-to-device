/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
// Leave the above lines for propper jshinting
//Type Node.js Here :)

var Https = require('azure-iothub').Https;
var Client = require('azure-iothub').Client;
var Registry = require('azure-iothub').Registry;
var ConnectionString = require('azure-iothub').ConnectionString;
var _ = require('underscore');
var EventHubClient = require('azure-event-hubs').Client;

var myHostName = "sample-temperature-app.azure-devices.net";
var mySharedAccessKeyName = 'iothubowner';
var mySharedAccessKey = 'vdJinNU+SkFWKYnvHut8xd1QiPVPdMStYyqR0Hn5uF0=';
var myConnectionString = 'HostName='+ myHostName + ';SharedAccessKeyName='+ mySharedAccessKeyName + ';SharedAccessKey='+ mySharedAccessKey;
var deviceIndex = 1;
var startTime = Date.now(); 
var deviceList = [];
//Get the list of all devices
getDevices(myConnectionString);
//Show a high level summary of all devices
showDevices(deviceList);
//Monitor the event hub of a device at the given deviceIndex starting at the given start Time
monitorDevice(deviceIndex, startTime);

function monitorDevice(deviceInd, startTime) {
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
                  if(eventData.systemProperties['iothub-connection-device-id'] === arg1) {
                      console.log('Event : ' + eventData.body + '\n');                      
                  }
              })
              
          })
      })  
    })
    .catch(showError);    
}

function getDevices(connString) {
  if (!connString) {
    error('Missing connection string');
  }
  var registry = Registry.fromConnectionString(connString);
  registry.list(function(error, list){
    if(error) {
        showError(error);
    } else {
        deviceList = list;
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
      showError(err);
    } else {
      requestString +=';SharedAccessKey' + device.authentication.SymmetricKey.primaryKey;
      device.connectionString = requestString;
      console.log('\n Device : '+ device.deviceId + '\t Last Activity Time : ' + device.lastActivityTime + '\t Status : ' + device.status + '\t Message count : ' + device.cloudToDeviceMessageCount)
    }
  });
}


function showError(err){
  console.log('ERROR' + err);
}

