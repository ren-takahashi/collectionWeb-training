// =============================================================================
// release_animal テーブルの seed データ
// -----------------------------------------------------------------------------
// display_order : 収録順。
// reprint_from_release_name: 再録元タイトル名。null なら新規収録。
//
// 同じアニマルが複数タイトルに登場するデータを含めることで、
// Release と Animal の多対多リレーションを表現しています。
// =============================================================================

export const releaseAnimalData: {
  release_name: string;
  animal_name: string;
  display_order: number;
  item_type: "figure" | "medal" | null;
  reprint_from_release_name: string | null;
}[] = [
  // --------------------------------------------------------------------------
  // アニマルフィギュアシリーズ Vol.1（新規収録）
  // --------------------------------------------------------------------------
  { release_name: "アニマルフィギュアシリーズ Vol.1", animal_name: "ライオン",  display_order: 1,  item_type: null, reprint_from_release_name: null },
  { release_name: "アニマルフィギュアシリーズ Vol.1", animal_name: "ゾウ",      display_order: 2,  item_type: null, reprint_from_release_name: null },
  { release_name: "アニマルフィギュアシリーズ Vol.1", animal_name: "キリン",    display_order: 3,  item_type: null, reprint_from_release_name: null },
  { release_name: "アニマルフィギュアシリーズ Vol.1", animal_name: "シマウマ",  display_order: 4,  item_type: null, reprint_from_release_name: null },
  { release_name: "アニマルフィギュアシリーズ Vol.1", animal_name: "パンダ",    display_order: 5,  item_type: null, reprint_from_release_name: null },
  { release_name: "アニマルフィギュアシリーズ Vol.1", animal_name: "トラ",      display_order: 6,  item_type: null, reprint_from_release_name: null },

  // --------------------------------------------------------------------------
  // アニマルフィギュアシリーズ Vol.2（新規4体 + Vol.1 再録2体）
  // --------------------------------------------------------------------------
  { release_name: "アニマルフィギュアシリーズ Vol.2", animal_name: "ゴリラ",    display_order: 1,  item_type: null, reprint_from_release_name: null },
  { release_name: "アニマルフィギュアシリーズ Vol.2", animal_name: "チーター",  display_order: 2,  item_type: null, reprint_from_release_name: null },
  { release_name: "アニマルフィギュアシリーズ Vol.2", animal_name: "カバ",      display_order: 3,  item_type: null, reprint_from_release_name: null },
  { release_name: "アニマルフィギュアシリーズ Vol.2", animal_name: "サイ",      display_order: 4,  item_type: null, reprint_from_release_name: null },
  { release_name: "アニマルフィギュアシリーズ Vol.2", animal_name: "ライオン",  display_order: 5,  item_type: null, reprint_from_release_name: "アニマルフィギュアシリーズ Vol.1" },
  { release_name: "アニマルフィギュアシリーズ Vol.2", animal_name: "ゾウ",      display_order: 6,  item_type: null, reprint_from_release_name: "アニマルフィギュアシリーズ Vol.1" },

  // --------------------------------------------------------------------------
  // アニマルフィギュアシリーズ Vol.3（新規2体 + 再録3体）
  // --------------------------------------------------------------------------
  { release_name: "アニマルフィギュアシリーズ Vol.3", animal_name: "ペンギン",  display_order: 1,  item_type: null, reprint_from_release_name: null },
  { release_name: "アニマルフィギュアシリーズ Vol.3", animal_name: "シロクマ",  display_order: 2,  item_type: null, reprint_from_release_name: null },
  { release_name: "アニマルフィギュアシリーズ Vol.3", animal_name: "キリン",    display_order: 3,  item_type: null, reprint_from_release_name: "アニマルフィギュアシリーズ Vol.1" },
  { release_name: "アニマルフィギュアシリーズ Vol.3", animal_name: "トラ",      display_order: 4,  item_type: null, reprint_from_release_name: "アニマルフィギュアシリーズ Vol.1" },
  { release_name: "アニマルフィギュアシリーズ Vol.3", animal_name: "ゴリラ",    display_order: 5,  item_type: null, reprint_from_release_name: "アニマルフィギュアシリーズ Vol.2" },

  // --------------------------------------------------------------------------
  // アニマルフィギュアシリーズ Vol.4（再録5体）
  // --------------------------------------------------------------------------
  { release_name: "アニマルフィギュアシリーズ Vol.4", animal_name: "ライオン",  display_order: 1,  item_type: null, reprint_from_release_name: "アニマルフィギュアシリーズ Vol.1" },
  { release_name: "アニマルフィギュアシリーズ Vol.4", animal_name: "パンダ",    display_order: 2,  item_type: null, reprint_from_release_name: "アニマルフィギュアシリーズ Vol.1" },
  { release_name: "アニマルフィギュアシリーズ Vol.4", animal_name: "チーター",  display_order: 3,  item_type: null, reprint_from_release_name: "アニマルフィギュアシリーズ Vol.2" },
  { release_name: "アニマルフィギュアシリーズ Vol.4", animal_name: "サイ",      display_order: 4,  item_type: null, reprint_from_release_name: "アニマルフィギュアシリーズ Vol.2" },
  { release_name: "アニマルフィギュアシリーズ Vol.4", animal_name: "シロクマ",  display_order: 5,  item_type: null, reprint_from_release_name: "アニマルフィギュアシリーズ Vol.3" },

  // --------------------------------------------------------------------------
  // アニマルフィギュアシリーズ Vol.5（再録5体）
  // --------------------------------------------------------------------------
  { release_name: "アニマルフィギュアシリーズ Vol.5", animal_name: "シマウマ",  display_order: 1,  item_type: null, reprint_from_release_name: "アニマルフィギュアシリーズ Vol.1" },
  { release_name: "アニマルフィギュアシリーズ Vol.5", animal_name: "ゾウ",      display_order: 2,  item_type: null, reprint_from_release_name: "アニマルフィギュアシリーズ Vol.1" },
  { release_name: "アニマルフィギュアシリーズ Vol.5", animal_name: "カバ",      display_order: 3,  item_type: null, reprint_from_release_name: "アニマルフィギュアシリーズ Vol.2" },
  { release_name: "アニマルフィギュアシリーズ Vol.5", animal_name: "ペンギン",  display_order: 4,  item_type: null, reprint_from_release_name: "アニマルフィギュアシリーズ Vol.3" },
  { release_name: "アニマルフィギュアシリーズ Vol.5", animal_name: "トラ",      display_order: 5,  item_type: null, reprint_from_release_name: "アニマルフィギュアシリーズ Vol.1" },
];
