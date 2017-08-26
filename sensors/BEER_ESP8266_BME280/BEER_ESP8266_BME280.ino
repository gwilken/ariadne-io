#include <ESP8266WiFi.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BMP280.h>
#include <ArduinoJson.h>
#include <WiFiClientPrint.h>

WiFiClient client;

const char* ssid     = "ARI_NET";
const char* password = "raspberry";

Adafruit_BMP280 bmp;

float temp;
float f;

void setup() {
  client.setNoDelay(1);

  Serial.begin(115200);

  delay(10);

  Serial.println("Sensor Test");
  if (!bmp.begin())
  {
    Serial.print("Sensor not detected.");
    while (1);
  }
  else {
    Serial.println("Sensor ready.");
  }

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

    Serial.println("connected");
    Serial.println("");

    getReadings();

    DynamicJsonBuffer jsonBuffer;
    JsonObject& root = jsonBuffer.createObject();

    root["family"] = "house";
    root["displayName"] = "Refrigerator";

    JsonArray& data = root.createNestedArray("data");

    JsonObject& temperature = data.createNestedObject();
    temperature["sensor"] = "temp";
    temperature["displayName"] = "Beer Temperature";
    temperature["data"] = temp;
    temperature["unit"] = "C";
 
    char buffer[256];
    root.printTo(buffer, sizeof(buffer));
    
    client.print(buffer);
  
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

void getReadings() {

    temp = bmp.readTemperature() * 1.8 + 32;
    Serial.print("Temperature: ");
    Serial.print(temp);
    Serial.println(" C");
  }
