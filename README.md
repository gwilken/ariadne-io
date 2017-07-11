# Ariadne-IO
A wireless hardware and software IoT project that monitors multiple streams of realtime data from a sailboat over the internet.

### Project Overview

The project consists of three major components:

* Sensors: Wireless sensors, local to the boat, that monitor specific data points and transmit info back to a local hub. Built around ESP8266 modules.

* Hub: A Raspberry Pi, local to the boat, running Node.js and MongoDB that receives and manages data from the sensors and transmits it to a server visible to the internet.

* Cloud Service: A VPS server running a MERN stack that receives incoming data from the hub and renders a page with realtime info with access to historical data.
