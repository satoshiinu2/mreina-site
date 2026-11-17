# mreina-site

www.mreina-tits-leaks.net の公開サイト。Next.js（App Router）＋ 静的書き出し。

## 開発

```sh
npm install
npm run dev        # http://localhost:3000
```

## ビルド

```sh
npm run build      # 静的ファイルが out/ に書き出される
```

## Cloudflare Pages へのデプロイ（Git 連携）

このリポジトリを Cloudflare Pages に接続すると、push するたびに自動で
ビルド＆デプロイされる。

1. Cloudflare ダッシュボード → Workers & Pages → Create application →
   Pages → Connect to Git → このリポジトリ（mreina-site）を選択
2. ビルド設定
   - Framework preset: Next.js (Static HTML Export)
   - Build command: `npm run build`
   - Build output directory: `out`
   - Production branch: `main`
3. カスタムドメイン: Pages プロジェクト → Custom domains →
   `www.mreina-tits-leaks.net` を追加（DNS は同じ Cloudflare ゾーン内なので自動）

注意: このサイトは公開用。files-private / proxy-private（AQUOS 側）とは無関係で、
Tunnel には入れないこと。
