
#include <ESP8266WiFi.h>
#include <SPI.h>
#include <Wire.h>
#include <Adafruit_INA219.h>
#include <ArduinoJson.h>

WiFiClient client;

const char* ssid     = "ARI_NET";
const char* password = "raspberry";
 
Adafruit_INA219 ina219;

String family = "Energy";
String name = "Solar Controller Monitor";
int id = 2;
float shuntvoltage;
float busvoltage;
float current;
float loadvoltage;
  
 StaticJsonBuffer<200> jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();

void setup()   {     
             
  Serial.begin(115200);

  // Init INA219
  ina219.begin();
  //ina219.setCalibration_16V_400mA();
  ina219.setCalibration_16V_32A();

  // We start by connecting to a WiFi network
  Serial.println();
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
 
  Serial.println("");
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());


  while ( !client.connected() ) {
      Serial.print("Connecting to hub");
      connectToHub();
      delay(2000);
      Serial.print(".");
    }

  Serial.println("Hub connected"); 
  
}


void loop() {

   if (client.connected()) {
    Serial.println("connected");
    Serial.println("");

    measureCurrent();

    delay(1000);

    root["family"] = family;
    root["name"] = name;
    root["shuntvoltage"] = shuntvoltage;
    root["busvoltage"] = busvoltage;
    root["current"] = current;
    root["loadvoltage"] = loadvoltage;

    root.printTo(client);
   
   
    } else {
        Serial.println("Attempting reconnect to hub");
        connectToHub();
        delay(2000);
    }
   
}

void connectToHub() {

  if (!client.connect("192.168.10.1", 3215)) {
  //  Serial.println("connection to hub failed");
    return;
    
  } else {
    return;
    }
}

// Function to measure current
float measureCurrent() {

  // Measure
  shuntvoltage = ina219.getShuntVoltage_mV();
  busvoltage = ina219.getBusVoltage_V();
  current = ina219.getCurrent_mA();
  loadvoltage = busvoltage + (shuntvoltage / 1000);
  
  Serial.print("Bus Voltage:   "); Serial.print(busvoltage); Serial.println(" V");
  Serial.print("Shunt Voltage: "); Serial.print(shuntvoltage); Serial.println(" mV");
  Serial.print("Load Voltage:  "); Serial.print(loadvoltage); Serial.println(" V");
  Serial.print("Current:       "); Serial.print(current); Serial.println(" mA");
  Serial.println("");

  // If negative, set to zero
  if (current < 0) {
    current = 0.0; 
  }
 
  return current;
}

