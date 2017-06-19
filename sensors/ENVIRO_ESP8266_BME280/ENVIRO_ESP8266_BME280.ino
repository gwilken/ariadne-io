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

String family = "Environmental";
String name = "Environmental Sensor";
int id = 3;
float temperature;
float humidity;
float pressure;


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

    getReadings();

    delay(1000);

    StaticJsonBuffer<200> jsonBuffer;
    JsonObject& root = jsonBuffer.createObject();

    root["family"] = family;
    root["id"] = id;
    root["temperature"] = temperature;
    root["pressure"] = pressure;

    WiFiClientPrint<200> p(client);

    root.printTo(p);
    p.stop();

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

    temperature = bmp.readTemperature();
    pressure = bmp.readPressure() / 100.0F;

    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.println(" C");

    Serial.print("Pressure:    ");
    Serial.print(pressure);
    Serial.println(" hPa");
  }
