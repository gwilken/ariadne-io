#include <ESP8266WiFi.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <ArduinoJson.h>

#define SEALEVELPRESSURE_HPA (1013.25)
Adafruit_BME280 bme;


WiFiClient client;

const char* ssid     = "ARI_NET";
const char* password = "raspberry";

String family = "Environmental";
String name = "Environmental Sensor";
int id = 7;
float temperature;
float humidity;
float pressure;

StaticJsonBuffer<200> jsonBuffer;
JsonObject& root = jsonBuffer.createObject();


void setup() {
  Serial.begin(115200);
  delay(10);
  
  Serial.println("Sensor Test");
  if (!bme.begin())
  {
    Serial.print("Ooops, no BME280 detected ... Check your wiring or I2C ADDR!");
    while (1);

  }
  else {
    Serial.println("BME280 ready.");
  }
  // Connect to WiFi access point.
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");

  }
  Serial.println();
  
  Serial.println("WiFi connected");
  Serial.println("IP address: "); Serial.println(WiFi.localIP());

    const int httpPort = 8080;
  if (!client.connect("192.168.10.1", httpPort)) {
    Serial.println("connection to node failed");
    return;
  }
}

void loop() {


  temperature = bme.readTemperature();
  Serial.print("Temperature: ");
  Serial.print(temperature);
  Serial.println(" C");


  pressure = bme.readPressure() / 100.0F;
  Serial.print("Pressure:    ");
  Serial.print(pressure);
  Serial.println(" hPa");
  

  humidity = bme.readHumidity();
  Serial.print("Humidity:    ");
  Serial.print(humidity);
  Serial.println(" %");
  
  root["family"] = family;
  root["id"] = id;
  root["temperature"] = temperature;
  root["humidity"] = humidity;
  root["pressure"] = pressure;

  root.printTo(client);

  
  delay(1000);
}



