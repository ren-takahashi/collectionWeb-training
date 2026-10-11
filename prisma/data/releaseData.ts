// =============================================================================
// release テーブルの seed データ
// -----------------------------------------------------------------------------
// series_name: 紐づくシリーズ名。seed.ts 内で series_id に変換されます。
// number_in_series: シリーズ内の連番。
// =============================================================================

export const releaseList: {
  series_name: string;
  number_in_series: number;
  name: string;
  release_year: number | null;
  description: string;
}[] = [
  {
    series_name: 'アニマルフィギュアシリーズ Vol.1',
    number_in_series: 1,
    name: 'アニマルフィギュアシリーズ Vol.1',
    release_year: null,
    description: 'アニマルフィギュアシリーズの記念すべき第1弾。ライオンやゾウなど人気の動物が勢揃いしました。',
  },
  {
    series_name: 'アニマルフィギュアシリーズ Vol.2',
    number_in_series: 1,
    name: 'アニマルフィギュアシリーズ Vol.2',
    release_year: null,
    description: '第2弾ではゴリラやチーターなど新たなラインナップが加わりました。Vol.1 の人気アニマルも一部再録されています。',
  },
  {
    series_name: 'アニマルフィギュアシリーズ Vol.3',
    number_in_series: 1,
    name: 'アニマルフィギュアシリーズ Vol.3',
    release_year: null,
    description: '第3弾ではペンギンやシロクマといった寒冷地の動物が初登場。これまでのシリーズの人気アニマルも収録されました。',
  },
  {
    series_name: 'アニマルフィギュアシリーズ Vol.4',
    number_in_series: 1,
    name: 'アニマルフィギュアシリーズ Vol.4',
    release_year: null,
    description: '第4弾では過去シリーズの人気アニマルを中心にラインナップを構成。復刻・再評価版として人気を博しました。',
  },
  {
    series_name: 'アニマルフィギュアシリーズ Vol.5',
    number_in_series: 1,
    name: 'アニマルフィギュアシリーズ Vol.5',
    release_year: null,
    description: 'シリーズ最終弾。これまでの全シリーズから厳選されたアニマルたちが集結したファイナルエディションです。',
  },
];
