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

## Cloudflare へのデプロイ（Git 連携）

このリポジトリを Cloudflare Workers（静的アセット配信）に接続してあり、
push するたびに自動でビルド＆デプロイされる。

- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- `wrangler.jsonc` の `assets.directory` が `./out`（静的書き出し先）を指す
- カスタムドメイン: Worker の Settings → Domains & Routes から
  `www.mreina-tits-leaks.net` を追加（DNS は同じ Cloudflare ゾーン内なので自動）

注意: このサイトは公開用。files-private / proxy-private（AQUOS 側）とは無関係で、
Tunnel には入れないこと。
