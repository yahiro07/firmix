import Heading from "@theme/Heading";
import clsx from "clsx";
import styles from "./styles.module.css";

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<"svg">>;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    title: "ファームウェア書き込み",
    Svg: require("@site/static/img/undraw_docusaurus_mountain.svg").default,
    description: (
      <>ブラウザから自分のボードに簡単にファームウェアを書き込めます。</>
    ),
  },
  {
    title: "統一されたパッケージ",
    Svg: require("@site/static/img/undraw_docusaurus_tree.svg").default,
    description: (
      <>
        プロジェクトの形式が統一されているので、配布形態の違いで迷うことがありません。
      </>
    ),
  },
  {
    title: "ローカルフォルダ連携",
    Svg: require("@site/static/img/undraw_docusaurus_react.svg").default,
    description: (
      <>
        PCのローカルプロジェクトフォルダから、簡単にプロジェクトを投稿できます。
      </>
    ),
  },
];

function Feature({ title, Svg, description }: FeatureItem) {
  return (
    <div className={clsx("col col--4")}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
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
