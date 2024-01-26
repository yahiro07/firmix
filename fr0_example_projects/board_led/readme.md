# BoardLEDサンプル

BoardLEDモジュールのサンプルです。

RP2040の各種マイコンボードに搭載されているLEDをインジケータとして使用できます。

このサンプルではR/G/Bの3つのLEDを順番に光らせます。

## ボードLED

ボードと設定値の対応は以下のとおりです

|値|ボード|
|--|--|
|0|なし|
|1|RPiPico|
|2|KB2040|
|3|Xiao RP2040|
|4|RP2040-Zero|
|5|Tiny2040|
|6|ProMicro RP2040|

## 備考

Raspberry Pi PicoではLEDが一つしかないため、このLEDが
3個分のLEDの役割を兼ねています。
3つのLED内部状態のうち少なくとも1つがONのときに光ります。
