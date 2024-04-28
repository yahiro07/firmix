# Firmix

マイコンのファームウェアを投稿して公開するためのWebサービスです。
マイコンを使った作品の概要とファームウェアのバイナリを投稿して、誰でも簡単に作品を再現できるようにすることを目的としています。

https://firmix.nector.me

## バリエーション

### Firmix (Base)

電子工作の作品を投稿してファームウェアを公開するための、基本的な機能を実装しています。  
なるべくシンプルな構成にしています。


### Firmix KFX

Kermite(自作キーボードエコシステム)のカスタムファームウェアを配布するために作っているバージョンです。  
ファームウェアダウロード時に設定値を書き換えるバイナリパッチングの機能を追加しています。

## 構成

### 開発環境
React, TypeScript, MongoDBを共通で使っています。

フレームワークとCSS in JSライブラリの構成を模索中です。

|パッケージ|対象サイト|構成|リリースURL
|--|--|--|--|
|web-firmix|Firmix|Remix, Panda CSS| -- |
|web-firmix-nextjs|Firmix|Next.js, Panda CSS| firmix.nector.me |
|web-kfx|KFX|Remix, Linaria| firmix-kfx.nector.me |

Firmix(Base)のサイトの実装が2つあり、RemixとNextJSのどちらで今後開発を進めていくかまだ決まっていません。

### 運用環境

|要素|インフラ|備考|
|--|--|--|
|DB|VPS|MongoDB 6.0|
|オブジェクトストレージ|Cloudflare R2||
|アプリサーバ|GCP Cloud Run||

Node.jsのサーバをCloud Runで実行しています。VPSに配置したMongoDBにアクセスしています。画像やファームウェアのバイナリなどのアセットはCloudflare R2で保持しています。

## ローカル開発

[./firmix_nodejs/readme.md](./firmix_nodejs/readme.md)に、環境構築とローカルサーバーの実行方法をまとめてあります。
