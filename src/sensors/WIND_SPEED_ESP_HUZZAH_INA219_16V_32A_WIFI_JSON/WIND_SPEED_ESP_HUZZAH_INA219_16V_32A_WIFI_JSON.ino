#include <WiFi.h>
#include <Wire.h>
#include <ArduinoJson.h>

WiFiClient client;

const char* ssid     = "ARI_NET";
const char* password = "raspberry";

String family = "Environmental";
String name = "Wind Speed";
int id = 8;


void setup()   {
  client.setNoDelay(1);

  Serial.begin(115200);

  delay(10);

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

    int val = analogRead(26);

    Serial.println(val);

    delay(1000);

    StaticJsonBuffer<200> jsonBuffer;
    JsonObject& root = jsonBuffer.createObject();

    root["family"] = family;
    root["name"] = name;
    root["speed"] = val;

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
  //  Serial.println("connection to hub failed");
    return;

  } else {
    return;
    }
}
