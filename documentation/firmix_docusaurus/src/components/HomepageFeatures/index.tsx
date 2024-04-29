import Heading from "@theme/Heading";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  imageUrl: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "ファームウェア書き込み",
    imageUrl: "/img/iconfinder/8703947_flash_bolt_lightening_icon.png",
    description: (
      <>ブラウザから自分のボードに簡単にファームウェアを書き込めます。</>
    ),
  },
  {
    title: "統一されたパッケージ",
    imageUrl: "/img/iconfinder/8644341_empty_box_package_icon.png",
    description: (
      <>
        プロジェクトの形式が統一されているので、配布形態の違いで迷うことがありません。
      </>
    ),
  },
  {
    title: "ローカルフォルダ連携",
    imageUrl: "/img/iconfinder/8703953_folder_file_document_icon.png",
    description: (
      <>
        PCのローカルプロジェクトフォルダから、簡単にプロジェクトを投稿できます。
      </>
    ),
  },
];

function Feature({ title, imageUrl, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <img src={imageUrl} className={styles.featureImg} />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
