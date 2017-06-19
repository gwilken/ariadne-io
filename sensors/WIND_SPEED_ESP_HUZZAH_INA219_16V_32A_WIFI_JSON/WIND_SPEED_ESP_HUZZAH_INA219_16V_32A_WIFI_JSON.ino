
#include <WiFi.h>
#include <Wire.h>
#include <ArduinoJson.h>

WiFiClient client;

const char* ssid     = "ARI_NET";
const char* password = "raspberry";

int val = 0;

String family = "Enviro";
String name = "Wind Speed";
int id = 8;
float speed;
  
 StaticJsonBuffer<200> jsonBuffer;
  JsonObject& root = jsonBuffer.createObject();

void setup()   {     
             
  Serial.begin(115200);

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

    val = analogRead(26);    // read the input pin

    Serial.println(val); 

    delay(1000);

    root["family"] = family;
    root["name"] = name;
    root["speed"] = val;

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


