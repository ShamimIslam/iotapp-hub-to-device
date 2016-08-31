Iot Hub to Device App
============================
This sample app demonstrates how to grab data from the Microsoft Azure Hub. This hub then encrypts the data and allows the user to either store or read the information received from the device.This is the next step app after the IoT Device to Hub App

Important App Files
---------------------------
* main.js
* package.json
* icon.png
* README.md
* 
Requirements
------------

### Hardware
-	[Intel® Edison Board or Intel® Galileo Board](https://software.intel.com/iot/hardware/devkit) with a Breakout Board
-	Development system with Linux\*, Microsoft\* Windows\* 7+ or Apple\* OS X\*

![Intel Edison CPU module mounted on an Intel Edison breakout board](/img/breakoutBoard.JPG)

### Software
-   [Intel® XDK](http://xdk.intel.com) for your development system (August, 2016
    release or later)
-   A standard ssh client for your dev system (e.g., [PuTTY\* SSH
    client](http://www.putty.org/) for Windows)
-	An Microsoft Azure membership for the Azure Hub

>**NOTE:** You can get your Azure membership by going to the [Portal Website](https://portal.azure.com). For this app you don't need a full subscription to 
>the services - you can get the free trial if you would like. If you would like a
>detailed tutorial on how to set up the events hub please go to the 

Getting Started
---------------

### Opening the Project Files

Download and unzip a copy of the project files [IoT-Hub-to-Device](https://github.com/XXXXXXXX)  and put it in an
easily accessible folder on your workstation.

-   Start the Intel XDK and select "Open an Intel XDK Project” from the Projects
    tab (see the image below).

-   Locate the folder that contains the "IoT-Hub-to-Device" project you downloaded
    and unzipped and select the file with the `.xdk` extension.

![How to open an Intel XDK project](/img/projectExamp.png)

### Modifying the Source Files
You will need to modify your source file to contain the connection string that is unique to your own hub. This string is in the main.js file. All you will have to do is fill in the information with your own connection string information(myHostName = hostname, mySharedAccessKeyName = shared access key name, mySharedAccessKey = shared access key) everything else is set up to be filled in with the program.

Running the Project
-------------------

After all of your connections have been made, the last thing you will have to do is set up your wifi connection on the Edison or Galileo (where the Galileo will need to have a an expansion attached for the wifi connection). To do so you can follow this link to the [Intel Developer Zone](https://software.intel.com/en-us/connecting-your-intel-edison-board-using-wifi), which will show you how to connect your device to the internet.

Once your wifi connection is made, connect your work station to the same network. Navigate to the Intel XDK IoT and search for or create a manual connection to the Edison. This will allow you to now upload your project code to the device.

mraa
--------------------------------------------
* Included on the IoTDevkit Linux Image 

* source:  https://github.com/intel-iot-devkit/mraa
* license:  https://github.com/intel-iot-devkit/mraa/blob/9d488c8e869e59e1dff2c68218a8f38e9b959cd7/cmake/modules/LICENSE_1_0.txt