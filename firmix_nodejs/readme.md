# 環境構築

## 開発環境

Node.jsが必要です。バージョンは`18`以降を推奨します。  
ローカルマシンでMongoDBを動かす場合にDockerの使用を推奨しているので、必要な場合適宜導入してください。

## 依存パッケージの導入
このプロジェクトは`npm workspace`によるモノレポ構成になっています。  
モノレポのルートフォルダ(現在の階層)で
```shell
  npm install
```
を実行して依存パッケージをインストールします。
`packages/*`に各パッケージがありますが、これらで個別に`npm install`する必要はありません。


## 外部サービスの準備

ローカル開発には以下の外部サービスの準備が必要です。

- Github連携ログイン
- MongoDB
- Cloudflare R2

参考画像に`(SOME_VARIABLE)`のようなコメントを書いています。これは後ほど.envに設定する際に参照する値を示しています。

### Github連携ログイン

Githubの設定画面でデバッグ用のOAuth Appを作ります。

`Homepage URL`を`http://localhost:3000`  
`Authorization Callback URL`を`http://localhost:3000/auth/github/callback`にしてください。

![github](https://i.gyazo.com/70221d4eb5f2d3b2cfdbfa1f6e883d11.png)
  
Client Secretを作って値をメモしておきます。


### MongoDB

ローカルマシンで`MongoDB`を動かす場合、Docker Composeを使って起動するのが容易です。

[docker-compose.yaml](./docker_local_db/docker-compose.yaml)
```yaml
version: "3.8"

services:
  db_mongo:
    image: mongo:latest
    ports:
      - "27017:27017"
    volumes:
      - ./.docker-data/mongo/data/db:/data/db
      - ./.docker-data/mongo/data/configdb:/data/configdb
```

シェルで`./docker_local_db`に移動して、
```shell
  docker compose up
```
で起動します。

データベースやコレクションの作成はプログラム内で行っているので、これらを事前に準備する必要はありません。

DBのデータの内容の確認には[MongoDB Compass](https://www.mongodb.com/ja-jp/products/tools/compass)や[NoSql Booster](https://nosqlbooster.com/)を使うと良いでしょう。

### オブジェクトストレージ

CloudFlare R2 を使っています。AWS S3でも問題ないと思いますが、未検証です。

CloudFlare R2の画面でバケットを作成します。

r2.devサブドメインを有効にして、ブラウザからアクセスできるようにします。  
CORSポリシーで、`http://localhost:3000`と`http://localhost:5173`からのGETを許可してください。

![r2](https://i.gyazo.com/fd157d1ebea25b1d78729d859e5de4d4.png)



APIトークンを作り、バケットの読み書きの権限を与えてください。

![r2](https://i.gyazo.com/d81d8f5545bbf04615c9e562f8023909.png)

![r2](https://i.gyazo.com/190af33b0e23b92ac5f9b7e3eb07891f.png)

認証情報をメモしておきます。


## .envの設定

`./packages/web-firmix`がフロントエンドのエントリパッケージとなっています。  
`.env.example`というファイルがあるのでこれをコピーして`.env`を作成します。

ローカル開発での`.env`ファイルの例を示します。GithubとR2の接続情報などは上記の設定画面を参照して値を指定します。
適宜調整してください。

.env
```shell
ENV_TYPE=development

MONGO_URL=mongodb://localhost:27017
MONGO_DATABASE_NAME=firmix_dev #なんでもOK

S3_ACCESS_KEY_ID=(S3_ACCESS_KEY_ID)
S3_ACCESS_KEY_SECRET=(S3_ACCESS_KEY_SECRET)
S3_ENDPOINT_URL=(S3_ENDPOINT_URL)
S3_BUCKET_NAME=(S3_BUCKET_NAME)
S3_PUBLIC_URL=(S3_PUBLIC_URL)

GITHUB_CLIENT_ID=(GITHUB_CLIENT_ID)
GITHUB_CLIENT_SECRET=(GITHUB_CLIENT_SECRET)

JWT_SECRET=secret_cat #なんでもOK
```

## 開発サーバーの起動

```shell
  npm run dev
```
で開発サーバーを起動します。

## 動作確認

`http://localhost:3000`にアクセスしてサイトが動作するか確認します。

![](https://i.gyazo.com/419a0bad5ab560b6ab2408edfdb26be8.png)

Githubのアカウントでログインして、ローカル開発画面でローカルプロジェクトを読み込み、投稿します。
ローカルプロジェクトがない場合は、[こちらのサンプルプロジェクト](https://github.com/yahiro07/firmix_projects/tree/main/firmix/blink_xiao_rp2040)をクローン/ダウンロードして使ってください。

![](https://i.gyazo.com/33f7008f20277e1df1eda543aec4e922.png)

投稿したプロジェクトが表示されれば動作確認はOKです。  
これで環境構築が一通り完了しました。