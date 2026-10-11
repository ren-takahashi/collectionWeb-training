# metal-collection-archive

アニマルフィギュアシリーズの個人サイト

---

## 使用技術

- Next.js / TypeScript
- Prisma 7
- PostgreSQL（Docker）

---

## 初回セットアップ（クローン後に実行）

### 1. Node.js のセットアップ

nvm を使って Node.js を有効化します。

```bash
export NVM_DIR="$HOME/.nvm" && \. "$NVM_DIR/nvm.sh"
nvm use --lts
```

> nvm 未インストールの場合は https://github.com/nvm-sh/nvm を参照してください。

### 2. 依存パッケージのインストール

```bash
npm install
```

### 3. 環境変数ファイルの作成

`.env` ファイルをリポジトリルートに作成し、以下の内容を記載します。

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/metal_collection"
```

> `.env` は `.gitignore` で除外されているため、クローン後に手動で作成が必要です。

### 4. PostgreSQL の起動

```bash
docker compose up -d
```

### 5. マイグレーション実行（テーブル作成）

```bash
npx prisma migrate dev --name init
```

> このコマンドは内部で `prisma generate`（Prisma Client の生成）も自動実行します。

> **Prisma 7 の接続方式について**  
> Prisma 7 では `schema.prisma` に `url = env("DATABASE_URL")` を書く方式が廃止されました。  
> 代わりに `@prisma/adapter-pg` を使い、`PrismaClient` にアダプターを渡して接続します（`prisma/seed.ts` 参照）。  
> `prisma.config.ts` の `datasource.url` は `migrate` などの CLI コマンド専用です。

### 6. シードデータの投入

```bash
npx prisma db seed
```

---

## 開発サーバーの起動

```bash
npm run dev
```

ブラウザで http://localhost:3000 を開きます。

---

## DB の中身を確認する（Prisma Studio）
ブラウザでDBの中身を確認・編集することができる Prisma Studio を起動。
```bash
npx prisma studio
```

ブラウザで http://localhost:51212 を開きます。

---

## schema.prisma を変更したあと

```bash
npx prisma migrate dev --name <変更内容の名前>
```

例: `npx prisma migrate dev --name add_note_to_animal`
