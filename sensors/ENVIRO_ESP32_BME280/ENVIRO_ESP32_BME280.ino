
#include <esp32-hal-adc.h>
#include <WiFi.h>
#include <Wire.h>
#include <Adafruit_Sensor.h>
#include <Adafruit_BME280.h>
#include <ArduinoJson.h>

#define ARDUINOJSON_ENABLE_PROGMEM 0

WiFiClient client;

const char* ssid     = "ARI_NET";
const char* password = "raspberry";
 
Adafruit_BME280 bme;

float temp;
float humid;
float pres;
float wind;

void setup() {
  
    Serial.begin(115200);

    analogSetPinAttenuation(A4, ADC_6db);
  
    Serial.println(F("BME280 test"));

    bool status;
    
    // default settings
    status = bme.begin();
    if (!status) {
        Serial.println("Could not find a valid BME280 sensor, check wiring!");
        while (1);
    }
    
    Serial.println("-- Default Test --");

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

    delay(1000);

    Serial.println("connected");
    Serial.println("");

    getReadings();

    DynamicJsonBuffer jsonBuffer;
    JsonObject& root = jsonBuffer.createObject();

    root["family"] = "enviro";
    root["displayName"] = "Environmental";

    JsonArray& data = root.createNestedArray("data");

    JsonObject& temperature = data.createNestedObject();
    temperature["sensor"] = "temp";
    temperature["displayName"] = "Temperature";
    temperature["data"] = temp;
    temperature["unit"] = "F";

    JsonObject& humidity = data.createNestedObject();
    humidity["sensor"] = "humidity";
    humidity["displayName"] = "Humidity";
    humidity["data"] = humid;
    humidity["unit"] = "%";

    JsonObject& pressure = data.createNestedObject();
    pressure["sensor"] = "pressure";
    pressure["displayName"] = "Barometric Pressure";
    pressure["data"] = pres;
    pressure["unit"] = "hPa";

    JsonObject& windspeed = data.createNestedObject();
    windspeed["sensor"] = "windspeed";
    windspeed["displayName"] = "Wind Speed";
    windspeed["data"] = wind;
    windspeed["unit"] = "m/s";
 
    char buffer[512];
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
  //  Serial.println("connection to hub failed");
    return;
    
  } else {
    return;
    }
}

void getReadings() {
     
    temp = bme.readTemperature() * 1.8 + 32;
    pres = bme.readPressure() / 100.0F;
    humid = bme.readHumidity();
    wind = ( ((analogRead(A4) - 819) * 32) / 3277);

    if(wind < 0) wind = 0;

    Serial.print("Temperature: ");
    Serial.print(temp);
    Serial.println(" C");
  
    Serial.print("Pressure:    ");
    Serial.print(pres);
    Serial.println(" hPa");

    Serial.print("Humidity: ");
    Serial.print(humid);
    Serial.println(" %");

    Serial.print("Wind Speed: ");
    Serial.print(wind);

   delay(100);

  }

