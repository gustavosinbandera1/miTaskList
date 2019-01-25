#include <ESP8266WiFi.h>
#include "SocketIOClient.h"

#define AN_CHAN A0

SocketIOClient client;

const char* ssid     = "HOME-EB05";
const char* password = "D8ED78ECC6372942";

char host[] = "192.168.1.54";
int port = 8080;

extern String RID;
extern String Rname;
extern String Rcontent;

unsigned long previousMillis = 0,previousMillis2=0;
long interval = 300;
unsigned long lastreply = 0;
unsigned long lastsend = 0;

void setup() {
  
  Serial.begin(115200);
  delay(10);
  pinMode(LED_BUILTIN, OUTPUT);
 

  //nos conectamos a la red wifi
  Serial.print("Connecting to ");
  Serial.println(ssid);
  conectar();
  
  Serial.println("WiFi connected");  
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  if (!client.connect(host, port)) {
    Serial.println("connection failed");
    return;
  }
  if (client.connected())
  {
    client.send("deviceConnection", "message", "Mi nombre es ESP8266, Y ESTOY ENVIANDO DATOS AL SERVIDOR EN EL MOMENTO DE LA CONEXION");
  }
}

void loop() {
unsigned long currentMillis = millis();

  if (currentMillis - previousMillis > interval)
  {
    previousMillis = currentMillis;
    String myString = String(analogRead(A0));
    client.send("ADC", "lectura", myString);
  }





  
  
  if (client.monitor())
  {
    Serial.println("***************************************************************");
    Serial.println(RID);
   // Serial.println(Rname);
    
    if(RID == "welcome" && Rname == "message")
    { 
     Serial.println(Rcontent);
     
    }
    if(RID == "esp:chat" && Rname == "message")
    { 
     Serial.println(Rcontent);
     
    }
  }

    if (!client.connected()) {
    Serial.println("connection terminated");
    Serial.println("reestarting communication");

        if (!client.connect(host, port)) {
          Serial.println("connection failed");
           return;
        }
    }

 


}


void conectar(void)
{
   WiFi.begin(ssid, password);
  
   while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
   }
}
