import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Breadcrumb from "@/components/Breadcrumb/Breadcrumb";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import ReleaseNavigation from "@/components/ReleaseNavigation/ReleaseNavigation";
import styles from "./page.module.css";

// 全タイトルを series.sort_order → number_in_series 順で取得し、
// 現在の id の前後のタイトルを返す
async function getAdjacentReleases(currentId: number) {
  const all = await prisma.release.findMany({
    orderBy: [
      { series: { sort_order: "asc" } },
      { number_in_series: "asc" },
    ],
    select: { id: true, name: true },
  });
  const index = all.findIndex((r) => r.id === currentId);
  return {
    prevRelease: index > 0 ? all[index - 1] : null,
    nextRelease: index < all.length - 1 ? all[index + 1] : null,
  };
}

// DBからタイトル詳細（収録アニマル・画像含む）を取得
async function getRelease(id: number) {
  return prisma.release.findUnique({
    where: { id },
    include: {
      series: true,
      release_images: {
        orderBy: { display_order: "asc" },
      },
      release_animals: {
        orderBy: { display_order: "asc" },
        include: {
          animal: true,
          reprint_from_release: true, // 再録元タイトル情報
        },
      },
    },
  });
}

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const release = await prisma.release.findUnique({
    where: { id: Number(id) },
    select: { name: true, series: { select: { name: true } } },
  });
  if (!release) return { title: "アニマルフィギュアシリーズアーカイブ" };
  return {
    title: `${release.name} | アニマルフィギュアシリーズアーカイブ`,
    description: `${release.series.name}「${release.name}」の収録アニマル・画像情報です。`,
    openGraph: {
      title: `${release.name} | アニマルフィギュアシリーズアーカイブ`,
      description: `${release.series.name}「${release.name}」の収録アニマル・画像情報です。`,
      images: [{ url: "/ogp.png", width: 1200, height: 630 }],
    },
  };
}

export default async function ReleaseDetailPage({ params }: Props) {
  const { id } = await params;
  const [release, { prevRelease, nextRelease }] = await Promise.all([
    getRelease(Number(id)),
    getAdjacentReleases(Number(id)),
  ]);

  // IDに該当するタイトルが存在しない場合は 404 ページを表示
  if (!release) notFound();

  // 新規収録と再録を分離
  const newReleaseAnimal = release.release_animals.filter(
    (rp) => rp.reprint_from_release_id === null
  );

  // メダルタイプが存在する場合はフィギュア・メダルで分けて表示する
  const hasMedalType = newReleaseAnimal.some((rp) => rp.item_type === "medal");
  const figureAnimals = newReleaseAnimal
    .filter((rp) => rp.item_type === "figure")
    .map((rp) => rp.animal.name);
  const medalAnimals = newReleaseAnimal
    .filter((rp) => rp.item_type === "medal")
    .map((rp) => rp.animal.name);
  // メダルタイプがない場合（旧シリーズ等）は item_type 問わず全件表示
  const newAnimals = newReleaseAnimal.map((rp) => rp.animal.name);

  // 再録は再録元タイトルでグループ化
  //   
  const reprintMap = new Map<string, string[]>();
  for (const rp of release.release_animals) {
    if (rp.reprint_from_release === null) continue;
    const sourceName = rp.reprint_from_release.name;
    if (!reprintMap.has(sourceName)) reprintMap.set(sourceName, []);
    reprintMap.get(sourceName)!.push(rp.animal.name);
  }

  return (
    <div className={styles.container}>
      <Breadcrumb
        items={[
          { label: "TOP", href: "/" },
          { label: "商品タイトル一覧", href: "/releases" },
          { label: release.name },
        ]}
      />

      {/* タイトル名 */}
      <h1 className={styles.heading}>{release.name}</h1>

      {/* 画像ギャラリー */}
      <ImageGallery images={release.release_images} releaseName={release.name} />

      {/* 収録アニマル（新規収録分） */}
      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>収録アニマル</h2>
        {hasMedalType ? (
          <>
            <p className={styles.itemTypeLabel}>▼ フィギュアタイプ</p>
            <p className={styles.animalList}>{figureAnimals.join("、")}</p>
            <p className={styles.itemTypeLabel}>▼ メダルタイプ</p>
            <p className={styles.animalList}>{medalAnimals.join("、")}</p>
          </>
        ) : (
          <p className={styles.animalList}>{newAnimals.join("、")}</p>
        )}
      </section>

      {/* 再録アニマル（再録元タイトルごとに表示） */}
      {reprintMap.size > 0 && Array.from(reprintMap.entries()).map(([sourceName, names]) => (
        <section key={sourceName} className={styles.section}>
          <h3 className={styles.subSectionHeading}>再録アニマル（{sourceName}より）</h3>
          <p className={styles.animalList}>{names.join("、")}</p>
        </section>
      ))}

      {/* 商品概要 */}
      {release.description && (
        <section className={styles.section}>
          <h2 className={styles.sectionHeading}>商品概要</h2>
          <p className={styles.description}>{release.description}</p>
        </section>
      )}

      {/* 前後タイトルへのナビゲーション */}
      <ReleaseNavigation prevRelease={prevRelease} nextRelease={nextRelease} />
    </div>
  );
}
