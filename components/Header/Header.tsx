import styles from "./Header.module.css";

/**
 * サイトヘッダー
 *
 */
export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <p className={styles.siteTitle}>アニマルフィギュアアーカイブ</p>
      </div>
    </header>
  );
}
