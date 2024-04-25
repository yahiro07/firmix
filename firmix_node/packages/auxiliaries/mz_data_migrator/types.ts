import { Db } from "mongodb";

export type IMzDbDataMigrationStep = {
  key: string;
  locked: boolean;
  operation(db: Db): Promise<void>;
};

export type IMzDbDataMigrationDefinition = {
  //マイグレーション管理用コレクションの名前 指定しない場合はデフォルトの名前になる
  managementCollectionName?: string;
  /*
各コレクションのデータ構造の変更をここに書く
dev環境:
 migrationKeyと関数のハッシュ値を連結したものをキーとして、これがなければ処理を実行してリビジョンを記録
本番環境:
 migrationKeyが管理用コレクションに登録されてない場合に処理を実行してリビジョンを記録
locked=false ..開発中でまだ処理内容が決まっていない状態
locked=true ..処理内容が固まっている状態。フラグを立てた以降は内容を変更しない想定
本番環境で、未適用のマイグレーションがある場合には例外を出して処理を止める
*/
  migrationsSteps: IMzDbDataMigrationStep[];
  /*
アプリに対して共通のDBセットアップ
冪等に処理ができるインデクス作成などの処理を主にここに書く
関数を文字列化したもののハッシュ値をとり、ハッシュ値が変わっていたら処理を実行する
ハッシュ値は1件ずつコレクションに記録し、過去に実行したハッシュと同じ内容の処理は実行しない
(新しいバージョンで最新の状態に更新されたあとに何らかの原因で古いバージョンが実行されたときに
再度古い状態に戻されてしまうのを防ぐために、全部のリビジョンをコレックションに記録する)
*/
  commonSetup(db: Db): Promise<void>;
};

export type IMzDbDataMigrator = {
  setup(def: IMzDbDataMigrationDefinition, isDevelopment: boolean): void;
  migrateCold(db: Db): Promise<void>;
  migrateHot(db: Db): Promise<boolean>;
  checkMigrations(db: Db): Promise<void>;
  clearInternalMigrationRecords(): Promise<void>;
};
