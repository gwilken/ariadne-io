
#include <ESP8266WiFi.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
//#include <Adafruit_BME280.h>
#include <Adafruit_BMP280.h>
#include <ArduinoJson.h>

WiFiClient client;

const char* ssid     = "ARI_NET";
const char* password = "raspberry";
 
//Adafruit_BME280 bme;
Adafruit_BMP280 bmp; // I2C


String family = "Environmental";
String name = "Environmental Sensor";
int id = 3;
float temperature;
float humidity;
float pressure;

StaticJsonBuffer<200> jsonBuffer;
JsonObject& root = jsonBuffer.createObject();

void setup() {
  
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
      Serial.print("Connecting to hub");
      connectToHub();
      delay(2000);
      Serial.print(".");
    }

  Serial.println("Hub connected"); 
  
}

void loop() {

   if (client.connected()) {

    delay(5000);

    Serial.println("connected");
    Serial.println("");

    getReadings();
 
    root["family"] = family;
    root["id"] = id;
    root["temperature"] = temperature;
    root["pressure"] = pressure;
  
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

void getReadings() {
     
    temperature = bmp.readTemperature();
    pressure = bmp.readPressure() / 100.0F;
    
    Serial.print("Temperature: ");
    Serial.print(temperature);
    Serial.println(" C");
  
    Serial.print("Pressure:    ");
    Serial.print(pressure);
    Serial.println(" hPa");

   delay(100);
  }

