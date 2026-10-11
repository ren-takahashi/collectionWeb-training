"use client";

import { useSearchParams } from "next/navigation";
import { FormEvent } from "react";
import styles from "./SearchForm.module.css";

export default function SearchForm() {
  const searchParams = useSearchParams();
  const currentQuery = searchParams.get("q") ?? "";

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    const formData = new FormData(e.currentTarget);
    const query = formData.get("q") as string;
    
    // 空または空白のみの場合は送信を止める
    if (!query || !query.trim()) {
      e.preventDefault();
    }
  };

  return (
    <form action="/search" method="get" className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="q"
        defaultValue={currentQuery}
        placeholder="例: キリン"
        className={styles.input}
        autoComplete="off"
      />
      <button type="submit" className={styles.button}>
        検索
      </button>
    </form>
  );
}
