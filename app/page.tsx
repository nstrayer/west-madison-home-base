import Image from "next/image";
import Data_Display_Client from "./Data_Display_Client";
import styles from "./page.module.css";

export default async function Home() {
  return (
    <main className={styles.main}>
      <h1 className={styles.header}>West Madison Home Base</h1>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/madison-house.png"
          alt="House Logo"
          width={767 / 3}
          height={892 / 3}
          priority
        />
      </div>
      <Data_Display_Client />
    </main>
  );
}
