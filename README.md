Intel® XDK IoT Node.js\* Hub to Device App
==========================================
See [LICENSE.md](LICENSE.md) for license terms and conditions.

This sample application is distributed as part of the
[Intel® XDK](http://xdk.intel.com). It can also be downloaded
or cloned directly from its git repo on the
[public Intel XDK GitHub\* site](https://github.com/gomobile).

For help getting started developing applications with the
Intel XDK, please start with
[the Intel XDK documentation](https://software.intel.com/en-us/xdk/docs).

See also, the
[mraa library documentation](https://iotdk.intel.com/docs/master/mraa/index.html)
for details regarding supported boards and the mraa library API and the
[upm library documentation](https://iotdk.intel.com/docs/master/upm/) for
information regarding the upm sensor and actuator library APIs.

App Overview
------------
This sample app demonstrates how to retrieve data from the Microsoft Azure Hub.
This app assumes you have run the "IoT Device to Hub App" and stored collected
data in your Microsoft Azure Hub account, which this app will retrieve and
display on the Node.js console.

> **NOTE:** You can get your Microsoft Azure Hub membership by going to the
> [Azure Portal](https://portal.azure.com). For this app you do not need a full
> subscription to the service - you can use the free trial. For a detailed
> tutorial on how to setup your Azure IoT hub, see:
> [Setup Azure IoT Hub](https://github.com/Azure/azure-iot-sdks/blob/master/doc/setup_iothub.md)

Getting Started
---------------
Download and unzip a copy of the project files and put it into an easily
accessible folder on your workstation.

* Start the Intel XDK and select "Open an Intel XDK Project” from the Projects
  tab (see the image below).

* Locate the folder that contains the "IoT-Hub-to-Device" project you downloaded
  and unzipped and select the file with the `.xdk` extension.

![How to open an Intel XDK project](/img/projectExamp.png)

### Modifying the Source Files

Modify the `connection.json` file to specify the connection string information
that is unique to your hub. The information shown below will not work, you must
change it to match your IoT hub connection identification information:

```JavaScript
{
    "HOST_NAME": "your-hostname",
    "SHARE_ACCESS_NAME": "shared-access-key-name",
    "FIRST_KEY": "shared-access-key"
}
```

To get your shared access key, goto your IoT Hub > Shared Access Policies >
IoT Hub Owner > Connection String - Primary.

![Share Policies Page](/img/sharedAccess.png)
![Key Page](/img/key.png)

Running the Project
-------------------
After all hardware and software configuration are complete, be sure to
configure your IoT board's network interface so it has access to the Internet.

Important App Files
-------------------
* main.js
* package.json
* connection.json

Important Project Files
-----------------------
* README.md
* LICENSE.md
* \<project-name\>.xdk

Tested IoT Node.js Platforms
----------------------------
* [Intel® Galileo Board for Arduino](http://intel.com/galileo)
* [Intel® Edison Board for Arduino](http://intel.com/edison)

This sample should run on any IoT [Node.js](http://nodejs.org) development
platform, because it does not require any sensor hardware.
