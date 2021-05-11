#  Apexi PowerFC NodeJS Interface & Datalogger

This project provides a **datalogger and bridge to dashboard applications** for the FD Mazda RX-7 equipped with an Apexi PowerFC and Datalogit.

This code runs on any unix environment running NodeJS when connected through USB to a Datalogit.

## Features
- Automatic ECM data logging on local machine or connected USB flash drive
- Provides a data feed through WebSockets to a dashboard UI application running on the same device

## Required Hardware
- Apexi PowerFC 
- Datalogit
- Unix-based computer (Linux or Mac), prefereably a small device mounted inside the car such as a RaspberryPi

Note: if you choose to install a RaspberryPi, the following needs to be handled:
- 5v power supply to the RaspberryPi
- Graceful shutdown through either a shutdown button or ignition-switch based trigger. Some add-ons exist that can help such as [this](https://mausberry-circuits.myshopify.com/collections/car-power-supply-switches)
*Note: 'hard' shutdowns by killing power to the RaspberryPi can cause operating system corruption*

## Installation
1. Install NodeJS version 10 on your system. [Download Link](https://nodejs.org/dist/latest-v0.10.x/)
2. Download the latest release of this project.  It will be a single javascript (main.js) file and a node_modules folder that needs to remain in the same directory as main.js.  
3. Run this script each time your system boots using the command `node main.js`.  On a RaspberryPi, this can be done through several means. I recommend rc.local as outlined [here](https://www.dexterindustries.com/howto/run-a-program-on-your-raspberry-pi-at-startup/).

Once this is done, the ecm interface script will run at every boot and will automatically connect to your ECM.

## Logging

To enable logging, connect a USB drive to your system and create a folder in the top-level of the drive named `PowerFC-Logs`.  CSV-formatted logs will automatically be created in this folder sorted by date.

