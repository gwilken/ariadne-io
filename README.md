# Ariadne-IO

## Building a Smart Sailboat

Using a Raspberry Pi and a bunch of ESP8266 modules to build a wireless IoT network on a 30' sailboat.

## Project Overview

The project consists of a few major components:

### Sensors
* Individual sensors that monitor a house battery bank, 4 motor batteries, energy usage, solar panel output, and environmental conditions. Data is transmitted back to a hub. I used the now classic ESP8266 module. I also used a couple of ESP32s to try them out. Each sensor/ESP is housed in a weatherproof box.

![sensor-closeup](/public/images/ariadne-closeup.jpeg)

So many sensors. So much data.

![sensor-family](/public/images/ariadne-sensor-fam.jpeg)

### Hub

* A Raspberry Pi, on the boat, running Node.js and MongoDB. It creates a local network using the Pi's onboard wifi and listens for any sensors. It also serves up the main web application locally to view data. The hub also sends data out to a internet viewable machine. I mounted a Ubiquiti Bullet M2 wifi radio with a high gain antennae at the top of the mast and fed 50' of cat6 cable down to the Pi to provide a connection out to the world. I also installed a Huawei USB cell modem to get to the internet when not in wifi range.     

The Raspberry Pi is housed in the blue Pelican Case.

![motor](/public/images/IMG_0015.jpeg)

## Electric Motor

* I removed the original Atomic 4 gasoline engine and replaced it with an Electric Yacht electric motor. It's powered by a 48 volt battery bank created by wiring 4 235 amp/hour batteries in series. Each battery has it's own separate sensor.

![motor](/public/images/ariadne-batts.jpeg)


The system comes with a wired display which plugs into the motor controller. While wiring it up, I discovered a second, unused communications port. There is nothing a nerd loves more then an open comm port.

![motor](/public/images/IMG_0026.jpeg)

The physical electrical interface is RS-485. I was able to hack together a home made cable and start getting data into Node.js via the Serialport module.

![motor](/public/images/IMG_0029.jpeg)

![motor](/public/images/IMG_0030.jpeg)

![motor](/public/images/IMG_0034.jpeg)

 I emailed the company and, amazingly, they sent me a byte level breakdown of the proprietary protocol they wrote to communicate with their display.

At first, it looked like garbage, but with some definite structure.

![motor](/public/images/rsserial.jpg)

But once we start bringing it in as hexadecimal, it's clear we have something:

![motor](/public/images/rshex.jpg)

Once the speed and packet length were figured out, it was just a matter of some simple bit shifting Node to get our values. Now we have realtime wireless electrical motor data!

![motor](/public/images/ari-motor.jpeg)

### Webpage

* The last piece was creating an internet accessible VPS server running a web application built with Node.js, Express, and MongoDB that receives info from the boat as JSON data over websockets and uses React.js to render data quickly and efficiently. I built a simple API that gets historical data from the Mongo database. It then can be graphed with a user selectable time range.

Here is the last 3 hours of energy usage. The spikes are the refrigerator compressor kicking on.

![house-historical](/public/images/ari-house-history.jpeg)

### The Result

A fast, single page app that gives us realtime status and historical info of 20 data points.

![ariadne-io-mainpage](/public/images/ari-main-1.jpeg)
![ariadne-io-mainpage](/public/images/ari-main-2.jpeg)
