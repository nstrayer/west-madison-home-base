"use client";
import Image from "next/image";

import styles from "./LoadingComponent.module.css";

export function LoadingComponent() {
  return (
    <div className={styles.container}>
      <Image
        className={styles.mippen}
        src="/mippen_face.png"
        alt="Hi there"
        width={767 / 3}
        height={892 / 3}
        priority
      />
      <h2 className={styles.loading_msg}>Loading data from office...</h2>
    </div>
  );
}
