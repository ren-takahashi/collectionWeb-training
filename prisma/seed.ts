import "dotenv/config";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../app/generated/prisma";
import { animalNames } from "./data/animalNames";
import { releaseList } from "./data/releaseData";
import { releaseAnimalData } from "./data/releaseAnimalData";
import { releaseImageData } from "./data/releaseImageData";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // ==========================================================================
  // series テーブル
  // シリーズマスタ
  // --------------------------------------------------------------------------
  // upsert を使うことで、すでに同名のレコードがある場合は更新、なければ作成します。
  // これにより、seed を何度実行しても重複エラーにならない。
  // ==========================================================================

  const seriesList = [
    { name: "アニマルフィギュアシリーズ Vol.1", sort_order: 1, description: "アニマルフィギュアシリーズ第1弾。" },
    { name: "アニマルフィギュアシリーズ Vol.2", sort_order: 2, description: "アニマルフィギュアシリーズ第2弾。" },
    { name: "アニマルフィギュアシリーズ Vol.3", sort_order: 3, description: "アニマルフィギュアシリーズ第3弾。" },
    { name: "アニマルフィギュアシリーズ Vol.4", sort_order: 4, description: "アニマルフィギュアシリーズ第4弾。" },
    { name: "アニマルフィギュアシリーズ Vol.5", sort_order: 5, description: "アニマルフィギュアシリーズ第5弾（最終弾）。" },
  ];

  for (const s of seriesList) {
    await prisma.series.upsert({
      where: { name: s.name },
      update: { description: s.description },
      create: s,
    });
  }

  console.log("Seriesテーブル マスタデータ挿入完了");

  // 投入済みシリーズを name → id のマップとして取得しておく
  // （後続の release 挿入で series_id を参照するために使用）
  const insertedSeries = await prisma.series.findMany();
  const seriesIdByName = Object.fromEntries(
    insertedSeries.map((s) => [s.name, s.id])
  );

  // ==========================================================================
  // release テーブル
  // 商品タイトルマスタ
  // --------------------------------------------------------------------------
  // series_id は上で作った seriesIdByName から名前で引きます。
  // @@unique([series_id, number_in_series]) の制約に合わせて where を指定します。
  // ==========================================================================

  // releaseList は prisma/data/releaseData.ts で管理しています。

  for (const r of releaseList) {
    const series_id = seriesIdByName[r.series_name];
    
    await prisma.release.upsert({
      where: {
        series_id_number_in_series: {
          series_id,
          number_in_series: r.number_in_series,
        },
      },
      update: {
        description: r.description,
      },
      create: {
        series_id,
        number_in_series: r.number_in_series,
        name: r.name,
        release_year: r.release_year,
        description: r.description,
      },
    });
  }

  console.log("Releaseテーブル マスタデータ挿入完了");

  // ==========================================================================
  // animal テーブル
  // アニマルマスタ
  // --------------------------------------------------------------------------
  // animalNames は別ファイルで定義している、アニマルの名前のリスト。
  // ==========================================================================

  for (const p of animalNames) {
    await prisma.animal.upsert({
      where: { name: p.name },
      update: { species_name: p.species_name },
      create: { name: p.name, species_name: p.species_name },
    });
  }

  console.log("Animalテーブル マスタデータ挿入完了");

  // ==========================================================================
  // releaseAnimal テーブル
  // 収録情報（中間テーブル）
  // --------------------------------------------------------------------------
  // release と animal を名前で引いて紐づけます。
  // @@unique([release_id, animal_id]) の制約に合わせて upsert を使います。
  // ==========================================================================

  // releaseテーブル と animalテーブル の投入済みデータを取得して、
  // リリース名 → id、アニマル名 → id のマップを作成。
  const insertedReleases = await prisma.release.findMany();
  const releaseIdByName = Object.fromEntries(
    insertedReleases.map((r) => [r.name, r.id])
  );
  const insertedAnimals = await prisma.animal.findMany();
  const animalIdByName = Object.fromEntries(
    insertedAnimals.map((p) => [p.name, p.id])
  );

  const releaseAnimalList = releaseAnimalData;

  // seed データと DB を同期するため、一度全削除してから再作成します。
  // upsert では行の削除を検知できないため、この方式にしています。
  await prisma.releaseAnimal.deleteMany({});

  const releaseAnimalRecords = releaseAnimalList.map((rp) => {
    const release_id = releaseIdByName[rp.release_name];
    const animal_id = animalIdByName[rp.animal_name];

    // 再録元タイトル名からIDに変換（nullなら新規収録）
    const reprint_from_release_id = rp.reprint_from_release_name
      ? releaseIdByName[rp.reprint_from_release_name]
      : null;

    // リリース名やアニマル名のスペルミスなどでIDが見つからない場合はエラーにする
    if (!release_id) throw new Error(`Release not found: ${rp.release_name}`);
    if (!animal_id) throw new Error(`Animal not found: ${rp.animal_name}`);
    if (rp.reprint_from_release_name && !reprint_from_release_id) {
      throw new Error(`Reprint source release not found: ${rp.reprint_from_release_name}`);
    }

    return {
      release_id,
      animal_id,
      display_order: rp.display_order,
      item_type: rp.item_type,
      reprint_from_release_id,
    };
  });

  await prisma.releaseAnimal.createMany({ data: releaseAnimalRecords });

  console.log("ReleaseAnimalテーブル マスタデータ挿入完了");

  // ==========================================================================
  // release_image テーブル
  // タイトル画像
  // --------------------------------------------------------------------------
  // release_name から release_id を解決して upsert します。
  // @@index([release_id]) のみで @@unique がないため、
  // 同じ release_id + image_path の組み合わせで upsert できるよう
  // 既存レコードを release_id で一旦削除してから insert し直す方式を採用します。
  // ==========================================================================

  // release_image は upsert の where 条件となる @@unique がないため、
  // 対象タイトルのレコードを削除してから再挿入する。
  const imageReleaseNames = [...new Set(releaseImageData.map((d) => d.release_name))];
  for (const name of imageReleaseNames) {
    const release_id = releaseIdByName[name];
    if (!release_id) throw new Error(`Release not found: ${name}`);
    await prisma.releaseImage.deleteMany({ where: { release_id } });
  }

  for (const img of releaseImageData) {
    const release_id = releaseIdByName[img.release_name];
    if (!release_id) throw new Error(`Release not found: ${img.release_name}`);

    await prisma.releaseImage.create({
      data: {
        release_id,
        image_path: img.image_path,
        display_order: img.display_order,
        alt_text: img.alt_text,
      },
    });
  }

  console.log("ReleaseImageテーブル マスタデータ挿入完了");
}

// =============================================================================
// エラーハンドリング
// -----------------------------------------------------------------------------
// main() でエラーが起きた場合にログを出力し、プロセスを終了します。
// finally で必ず DB 接続を切断します（接続しっぱなし防止）。
// =============================================================================
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
