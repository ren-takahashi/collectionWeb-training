"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Navigation.module.css";

const navItems = [
  { label: "TOP", href: "/" },
  { label: "商品タイトル一覧", href: "/releases" },
];

export default function Navigation() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className={styles.nav}>
      {/* スマホ幅でのみ表示されるアコーディオントリガー */}
      <button
        className={styles.accordionTrigger}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
      >
        <span>★MENU（タップしてね）★</span>
        <span className={`${styles.arrow} ${isOpen ? styles.arrowOpen : ""}`}>▼</span>
      </button>

      {/* PC幅では常時表示。スマホ幅では isOpen で開閉 */}
      <p className={styles.heading}>★MENU★</p>
      <ul className={`${styles.list} ${isOpen ? styles.open : ""}`}>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href} className={styles.listItem}>
              <span
                className={isActive ? styles.bulletActive : styles.bulletIdle}
                aria-hidden="true"
              >›</span>
              <Link
                href={item.href}
                className={`${styles.link} ${isActive ? styles.active : ""}`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
