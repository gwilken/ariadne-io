#include <ESP8266WiFi.h>
#include <SPI.h>
#include <Wire.h>
#include <Adafruit_INA219.h>
#include <ArduinoJson.h>
#include <WiFiClientPrint.h>

WiFiClient client;

const char* ssid     = "ARI_NET";
const char* password = "raspberry";

Adafruit_INA219 ina219;

float shuntvoltage;
float busvoltage;
float curr;
float loadvoltage;

void setup()   {
  client.setNoDelay(1);

  Serial.begin(115200);

  ina219.begin();
  ina219.setCalibration_16V_32A();

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
      Serial.print("Looking for hub");
      connectToHub();
      delay(2000);
      Serial.print(".");
    }

    Serial.println("Hub connected.");
    Serial.println("");
}


void loop() {

   if (client.connected()) {

    delay(1000);

    measureCurrent();

    DynamicJsonBuffer jsonBuffer;
    JsonObject& root = jsonBuffer.createObject();

    root["family"] = "house";
    root["displayName"] = "House";

    JsonArray& data = root.createNestedArray("data");

    JsonObject& voltage = data.createNestedObject();
    voltage["sensor"] = "voltage";
    voltage["displayName"] = "Battery Voltage";
    voltage["data"] = busvoltage;
    voltage["unit"] = "V";
    
    JsonObject& current = data.createNestedObject();
    current["sensor"] = "current";
    current["displayName"] = "Current Usage";
    current["data"] = curr;
    current["unit"] = "mA";
    
    char buffer[250];
    root.printTo(buffer, sizeof(buffer));
    
    client.print(buffer);
  
    delay(100);
        
    root.printTo(Serial);  
    delay(100);
        
    root.printTo(Serial);

    } else {
        Serial.println("Attempting reconnect to hub");
        connectToHub();
        delay(2000);
    }
}

void connectToHub() {

  if (!client.connect("192.168.10.1", 3215)) {
    return;

  } else {
    return;
    }
}


void measureCurrent() {

  shuntvoltage = ina219.getShuntVoltage_mV();
  busvoltage = ina219.getBusVoltage_V();
  curr = ina219.getCurrent_mA();
  loadvoltage = busvoltage + (shuntvoltage / 1000);

  Serial.print("Bus Voltage:   "); Serial.print(busvoltage); Serial.println(" V");
  Serial.print("Shunt Voltage: "); Serial.print(shuntvoltage); Serial.println(" mV");
  Serial.print("Load Voltage:  "); Serial.print(loadvoltage); Serial.println(" V");
  Serial.print("Current:       "); Serial.print(curr); Serial.println(" mA");
  Serial.println("");

  if (curr < 0) {
    curr = 0.0;
  }
}
