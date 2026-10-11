// =============================================================================
// release_image テーブルの seed データ
// -----------------------------------------------------------------------------
// image_path は public/ 配下を起点とした URL パス。
// =============================================================================

export const releaseImageData: {
  release_name: string;
  image_path: string;
  display_order: number;
  alt_text: string | null;
}[] = [
  // --------------------------------------------------------------------------
  // アニマルフィギュアシリーズ Vol.1
  // --------------------------------------------------------------------------
  {
    release_name: 'アニマルフィギュアシリーズ Vol.1',
    image_path: '/images/releases/1/001.svg',
    display_order: 1,
    alt_text: 'アニマルフィギュアシリーズ Vol.1 画像1',
  },
  {
    release_name: 'アニマルフィギュアシリーズ Vol.1',
    image_path: '/images/releases/1/002.svg',
    display_order: 2,
    alt_text: 'アニマルフィギュアシリーズ Vol.1 画像2',
  },
  {
    release_name: 'アニマルフィギュアシリーズ Vol.1',
    image_path: '/images/releases/1/003.svg',
    display_order: 3,
    alt_text: 'アニマルフィギュアシリーズ Vol.1 画像3',
  },
  {
    release_name: 'アニマルフィギュアシリーズ Vol.1',
    image_path: '/images/releases/1/004.svg',
    display_order: 4,
    alt_text: 'アニマルフィギュアシリーズ Vol.1 画像4',
  },
  // --------------------------------------------------------------------------
  // アニマルフィギュアシリーズ Vol.2
  // --------------------------------------------------------------------------
  {
    release_name: 'アニマルフィギュアシリーズ Vol.2',
    image_path: '/images/releases/2/001.svg',
    display_order: 1,
    alt_text: 'アニマルフィギュアシリーズ Vol.2 画像1',
  },
  {
    release_name: 'アニマルフィギュアシリーズ Vol.2',
    image_path: '/images/releases/2/002.svg',
    display_order: 2,
    alt_text: 'アニマルフィギュアシリーズ Vol.2 画像2',
  },
  {
    release_name: 'アニマルフィギュアシリーズ Vol.2',
    image_path: '/images/releases/2/003.svg',
    display_order: 3,
    alt_text: 'アニマルフィギュアシリーズ Vol.2 画像3',
  },
  {
    release_name: 'アニマルフィギュアシリーズ Vol.2',
    image_path: '/images/releases/2/004.svg',
    display_order: 4,
    alt_text: 'アニマルフィギュアシリーズ Vol.2 画像4',
  },
  // --------------------------------------------------------------------------
  // アニマルフィギュアシリーズ Vol.3
  // --------------------------------------------------------------------------
  {
    release_name: 'アニマルフィギュアシリーズ Vol.3',
    image_path: '/images/releases/3/001.svg',
    display_order: 1,
    alt_text: 'アニマルフィギュアシリーズ Vol.3 画像1',
  },
  {
    release_name: 'アニマルフィギュアシリーズ Vol.3',
    image_path: '/images/releases/3/002.svg',
    display_order: 2,
    alt_text: 'アニマルフィギュアシリーズ Vol.3 画像2',
  },
  {
    release_name: 'アニマルフィギュアシリーズ Vol.3',
    image_path: '/images/releases/3/003.svg',
    display_order: 3,
    alt_text: 'アニマルフィギュアシリーズ Vol.3 画像3',
  },
  {
    release_name: 'アニマルフィギュアシリーズ Vol.3',
    image_path: '/images/releases/3/004.svg',
    display_order: 4,
    alt_text: 'アニマルフィギュアシリーズ Vol.3 画像4',
  },
];
