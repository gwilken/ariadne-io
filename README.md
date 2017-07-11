# Ariadne-IO
A wireless hardware and software IoT project that monitors multiple streams of realtime data from a sailboat. Access data over the internet or locally. Designed for easy and quick viewing on an iPad. This project also taps into an open comm port of the Electric Yacht electric motor installed on the boat and decodes motor status messages, giving us a wealth of real time motor data.

### Project Overview

The project consists of three major components:

* Sensors: Wireless sensors, local to the boat, that monitor specific data points and transmit info back to a local hub. Built around ESP8266 modules.

* Hub: A Raspberry Pi, local to the boat, running Node.js and MongoDB that receives and manages data from the sensors and transmits it to a server visible to the internet.

* Cloud Service: A VPS server running a MERN stack that receives incoming data from the hub and renders a page with realtime info with access to historical data.

### The Result

A fast, single page app that gives us real time updates of 16 data points.

![ariadne-io-mainpage](/public/images/ariadne-main.jpeg)

### Historical Data

Access any data points history over time. Here we have 180 minutes of solar panel output, current and voltage:

![solar-panel-historical](/public/images/ariadne-12.jpeg)

## Sensors

The sensors are built around the ESP8266 module. Code for the sensors is available in this repo.

![sensor-family](/public/images/ariadne-sensor-fam.jpeg)

Each sensor is housed in a weatherproof box with waterproof wiring glands for cable pass through.

![sensor-closeup](/public/images/ariadne-closeup.jpeg)

Installed on two motor batteries:

![sensor-installed](/public/images/ariadne-batts.jpeg)




#### House current/voltage and Solar Panel current/voltage

#### Environmental Sensor



## Wired data

#### Tapping into the motor

#### GPS data
