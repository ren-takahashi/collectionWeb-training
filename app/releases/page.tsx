import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "商品タイトル一覧 | アニマルフィギュアシリーズアーカイブ",
  description:
    "アニマルフィギュアシリーズの全商品タイトル一覧です。シリーズごとに収録内容を確認できます。",
  openGraph: {
    title: "商品タイトル一覧 | アニマルフィギュアシリーズアーカイブ",
    description: "アニマルフィギュアシリーズの全商品タイトル一覧です。シリーズごとに収録内容を確認できます。",
    images: [{ url: "/ogp.png", width: 1200, height: 630 }],
  },
};

// DBからシリーズとリリース情報を取得する関数
// リリースのあるシリーズのみ取得し、シリーズ順・タイトル番号順に並べる
async function getSeriesWithReleases() {
  return prisma.series.findMany({
    where: {
      releases: { some: {} },
    },
    orderBy: { sort_order: "asc" },
    include: {
      releases: {
        orderBy: { number_in_series: "asc" },
      },
    },
  });
}

export default async function ReleasesPage() {
  const seriesList = await getSeriesWithReleases();

  return (
    <div className={styles.container}>
      <Breadcrumb
        items={[
          { label: "TOP", href: "/" },
          { label: "商品タイトル一覧" },
        ]}
      />

      <h1 className={styles.heading}>商品タイトル一覧</h1>

      {seriesList.map((series) => (
        <section key={series.id} className={styles.seriesGroup}>
          <h2 className={styles.seriesHeading}>■ {series.name}</h2>
          {series.description && (
            <p className={styles.seriesDescription}>{series.description}</p>
          )}
          <ul className={styles.releaseList}>
            {series.releases.map((release) => (
              <li key={release.id} className={styles.releaseItem}>
                {/* タイトル詳細実装時に本実装：<Link href={`/releases/${release.id}`}> に変更 */}
                <span className={styles.bullet}>・</span>
                <Link href={`/releases/${release.id}`} className={styles.releaseLink}>
                  {release.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
