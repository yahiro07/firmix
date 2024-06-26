# プロジェクト構成

## フォルダ構成

Firmixのプロジェクトは以下のようなフォルダ構成になっています。

```
my-project/
├── platformio.ini
├── firmix.project.json
├── readme.md
├── src/
│   └── main.cpp
└── thumbnail.jpg
```

実際のプロジェクトの例は[こちら](https://github.com/yahiro07/firmix_projects/blob/main/firmix/blink_xiao_rp2040)を参照してください。

このフォルダ構成で、Firmixが利用するファイルは以下のものです。

### readme.md

プロジェクトの詳細画面で表示されます。  
プロジェクトの概要やハードウェア構成を記述します。  
特に決まった書式はありません。

1行目に書いた大見出し(# 見出し)はプロジェクト詳細画面では表示されない、という仕様があります。
これはメタデータファイルで定義されたタイトルがページの一番上に表示されるので、ページ内でタイトルが重複して表示されるのを防ぐためです。


### firmix.project.json

プロジェクトのメタデータファイルです。  
プロジェクトに関する情報や設定をここに記述します。


### thumbnail.(png|jpg)

プロジェクト一覧のカードに表示されるサムネイル画像です。  
PNGとJPGの形式に対応しています。  
画像のサイズを縦横320x240以下にしてください。



