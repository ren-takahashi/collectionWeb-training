import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import styles from "./page.module.css";

// ひらがな → カタカナ変換
function toKatakana(str: string): string {
  return str.replace(/[\u3041-\u3096]/g, (ch) =>
    String.fromCharCode(ch.charCodeAt(0) + 0x60)
  );
}

async function searchAnimals(q: string) {
  const trimmed = q.trim();
  if (!trimmed) return [];

  // ひらがなで入力された場合もカタカナに変換して検索する
  const katakana = toKatakana(trimmed);

  return prisma.releaseAnimal.findMany({
    where: {
      animal: {
        OR: [
          // 入力値そのままで部分一致（大文字小文字を区別しない）
          { name: { contains: trimmed, mode: "insensitive" } },
          // カタカナに変換して部分一致
          { name: { contains: katakana, mode: "insensitive" } },
          // 図鑑上の正式名（species_name）でも検索
          { species_name: { contains: trimmed, mode: "insensitive" } },
          { species_name: { contains: katakana, mode: "insensitive" } },
        ],
      },
    },
    include: {
      animal: true,
      release: true,
    },
    orderBy: [
      { animal: { name: "asc" } },
      { release: { id: "asc" } },
    ],
  });
}

type Props = {
  searchParams: Promise<{ q?: string }>;
};

// 検索結果ページの meta タグ（SEO）
export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q = "" } = await searchParams;
  if (!q.trim()) {
    return { title: "検索 | アニマルフィギュアシリーズアーカイブ" };
  }
  return {
    title: `「${q}」の検索結果 | アニマルフィギュアシリーズアーカイブ`,
    description: `「${q}」を含むアニマルのアニマルフィギュアシリーズ収録情報を検索した結果です。`,
    openGraph: {
      title: `「${q}」の検索結果 | アニマルフィギュアシリーズアーカイブ`,
      description: `「${q}」を含むアニマルのアニマルフィギュアシリーズ収録情報を検索した結果です。`,
      images: [{ url: "/ogp.png", width: 1200, height: 630 }],
    },
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const results = await searchAnimals(q);

  // 検索クエリをDBに記録（匿名ログ）。失敗してもページ表示には影響させない
  if (q.trim()) {
    await prisma.searchLog
      .create({ data: { query: q.trim(), hit_count: results.length } })
      .catch(() => {});
  }

  return (
    <div className={styles.container}>
      <Breadcrumb
        items={[
          { label: "TOP", href: "/" },
          { label: "検索結果" },
        ]}
      />

      {q ? (
        <>
          <p className={styles.queryInfo}>
            「{q}」の検索結果：{results.length} 件
          </p>

          {results.length > 0 ? (
            <table className={styles.table}>
              <colgroup>
                <col className={styles.colAnimal} />
                <col className={styles.colRelease} />
              </colgroup>
              <thead>
                <tr>
                  <th className={styles.th}>アニマル名</th>
                  <th className={styles.th}>収録タイトル</th>
                </tr>
              </thead>
              <tbody>
                {results.map((rp) => (
                  <tr key={rp.id} className={styles.tr}>
                    <td className={styles.td}>
                      {rp.animal.name}
                      {rp.item_type === "medal" && (
                        <span className={styles.itemTypeBadge}>（メダル）</span>
                      )}
                    </td>
                    <td className={styles.td}>
                      <Link
                        href={`/releases/${rp.release.id}`}
                        className={styles.link}
                      >
                        {rp.release.name}
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className={styles.noResult}>見つかりませんでした</p>
          )}
        </>
      ) : (
        <p className={styles.noResult}>検索ワードを入力してください</p>
      )}
    </div>
  );
}
