import { useState } from "react";
import styles from "./styles.module.css";

export const GuidGenerator = () => {
  const [guid, setGuid] = useState("");

  const generateNext = () => {
    setGuid(crypto.randomUUID());
  };
  return (
    <div className={styles.base}>
      <input type="text" value={guid} readOnly />
      <button onClick={generateNext}>生成</button>
    </div>
  );
};
