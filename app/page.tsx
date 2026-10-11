import { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "TOP | アニマルフィギュアシリーズアーカイブ",
  description:
    "アニマルフィギュアシリーズの情報を集めた個人のアーカイブサイトです。",
  openGraph: {
    title: "アニマルフィギュアシリーズアーカイブ",
    description: "アニマルフィギュアシリーズの情報を集めた個人のアーカイブサイトです。",
    images: [{ url: "/ogp.png", width: 1200, height: 630 }],
  },
};

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>
        <span className={styles.headingDeco} aria-hidden="true">★</span>
        ようこそ、アニマルフィギュアシリーズアーカイブへ
        <span className={styles.headingDeco} aria-hidden="true">★</span>
      </h1>

      <div className={styles.body}>
        <p>このホームページは、<br />アニマルフィギュアシリーズの情報をまとめたアーカイブです。</p>
      </div>
    </div>
  );
}
