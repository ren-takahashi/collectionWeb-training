import Link from "next/link";
import styles from "./Breadcrumb.module.css";

type BreadcrumbItem = {
  label: string;
  href?: string; // href がない場合は現在地（リンクなし）として表示
};

type Props = {
  items: BreadcrumbItem[];
};

/**
 * パンくずリスト
 *
 * 使い方：
 * <Breadcrumb items={[
 *   { label: "TOP", href: "/" },
 *   { label: "商品タイトル一覧", href: "/releases" },
 *   { label: "アニマルフィギュアシリーズ" }, // 現在地は href なし
 * ]} />
 */
export default function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="パンくずリスト" className={styles.breadcrumb}>
      <ol className={styles.list}>
        {items.map((item, index) => (
          <li key={index} className={styles.item}>
            {index > 0 && (
              <span className={styles.separator} aria-hidden="true">
                &gt;
              </span>
            )}
            {item.href ? (
              <Link href={item.href} className={styles.link}>
                {item.label}
              </Link>
            ) : (
              <span className={styles.current}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
