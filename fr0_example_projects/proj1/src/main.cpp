#include <Arduino.h>

typedef struct {
  const char marker[8];
  int8_t pin_leds[2];
  int8_t pin_button;
} Bucket;

Bucket bucket = {
    .marker = "pindefs",
    .pin_leds = {0, 0},
    .pin_button = {0},
};

int pinLed0 = bucket.pin_leds[0];
int pinLed1 = bucket.pin_leds[1];
int pinButton = bucket.pin_button;

void setup() {
  pinMode(pinLed0, OUTPUT);
  pinMode(pinLed1, OUTPUT);
  pinMode(pinButton, INPUT_PULLUP);
}

void loop() {
  static int count = 0;
  if (count % 1000 == 0) {
    digitalWrite(pinLed0, !digitalRead(pinLed0));
  }
  digitalWrite(pinLed1, !digitalRead(pinButton));
  count++;
  delay(1);
}
