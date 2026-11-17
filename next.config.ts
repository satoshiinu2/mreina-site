import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 完全な静的サイトとして書き出す（Cloudflare Pages にそのまま置ける）
  output: "export",
  // 静的書き出しでは画像最適化サーバーが使えないため無効化
  images: { unoptimized: true },
};

export default nextConfig;
