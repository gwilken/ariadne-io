// Libraries
#include <ESP8266WiFi.h>
#include <SPI.h>
#include <Wire.h>
#include <Adafruit_INA219.h>
#include <ArduinoJson.h>


WiFiClient client;


const char* ssid     = "ARI_NET";
const char* password = "raspberry";
 

Adafruit_INA219 ina219;


String id = "battery_test";
float shuntvoltage;
float busvoltage;
float current_mA;
float loadvoltage;
  
 StaticJsonBuffer<200> jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();

void setup()   {     
             
  Serial.begin(115200);

  //JSON set up


  // Init INA219
  ina219.begin();
  ina219.setCalibration_16V_400mA();

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

  const int httpPort = 8080;
  if (!client.connect("192.168.10.1", httpPort)) {
    Serial.println("connection failed");
    return;
  }
  
}


void loop() {

  measureCurrent();

  delay(1000);

  root["sensor"] = id;
  root["shuntvoltage"] = shuntvoltage;
  root["busvoltage"] = busvoltage;
  root["current_mA"] = current_mA;
  root["loadvoltage"] = loadvoltage;

  root.printTo(client);


  delay(1000);
 
}

// Function to measure current
float measureCurrent() {

  // Measure
  shuntvoltage = ina219.getShuntVoltage_mV();
  busvoltage = ina219.getBusVoltage_V();
  current_mA = ina219.getCurrent_mA();
  loadvoltage = busvoltage + (shuntvoltage / 1000);
  
  Serial.print("Bus Voltage:   "); Serial.print(busvoltage); Serial.println(" V");
  Serial.print("Shunt Voltage: "); Serial.print(shuntvoltage); Serial.println(" mV");
  Serial.print("Load Voltage:  "); Serial.print(loadvoltage); Serial.println(" V");
  Serial.print("Current:       "); Serial.print(current_mA); Serial.println(" mA");
  Serial.println("");

  // If negative, set to zero
  if (current_mA < 0) {
    current_mA = 0.0; 
  }
 
  return current_mA;
  
}

// Function to measure power
float measurePower() {

  // Measure
  float shuntvoltage = ina219.getShuntVoltage_mV();
  float busvoltage = ina219.getBusVoltage_V();
  float current_mA = ina219.getCurrent_mA();
  float loadvoltage = busvoltage + (shuntvoltage / 1000);
  
  Serial.print("Bus Voltage:   "); Serial.print(busvoltage); Serial.println(" V");
  Serial.print("Shunt Voltage: "); Serial.print(shuntvoltage); Serial.println(" mV");
  Serial.print("Load Voltage:  "); Serial.print(loadvoltage); Serial.println(" V");
  Serial.print("Current:       "); Serial.print(current_mA); Serial.println(" mA");
  Serial.println("");

  // If negative, set to zero
  if (current_mA < 0) {
    current_mA = 0.0; 
  }
 
  return current_mA * loadvoltage;
  
}
