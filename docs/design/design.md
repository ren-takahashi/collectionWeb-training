## デザインコンセプト
GitHub のダークテーマをベースにしたモダンなダーク UI。

### トンマナ
背景色: #0d1117
サーフェス: #161b22
枠線: #30363d
本文文字: #e6edf3
ミュート文字: #8b949e
アクセント: #58a6ff
リンク: #79c0ff


#### デザイン方針、ルール
深い暗色背景
枠線は 1px のグレー（#30363d）
文字はグレーホワイト系
ヘッダーはテキストロゴ（「アニマルフィギュアアーカイブ」）
PCは左ナビ、SPはアコーディオン
角丸は使わない

#### CSSについて
Tailwind CSS は使用しない方針。  
デザインの細部までコントロールできるようにカスタムCSSを作成して独自のスタイルを適用する。  

→ CSS Modulesを採用する

#### Storybookは限定的に導入する

```txt
Storybook = 見た目コンポーネントの確認用
```

対象にするもの：

```txt
Header
Navigation
Breadcrumb
ReleaseCard
IntroSection
UpdateHistoryBox
AnimalImage / NoImage
```

対象にしないもの：

```txt
page.tsx
Prismaを直接呼ぶ処理
DB取得込みのコンポーネント
```

理由は、今回のようなレトロUIでは、パーツ単位で見た目を調整できるメリットが大きい。
