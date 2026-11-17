import type { Metadata } from "next";
import "./globals.css";

const siteName = "satoshiinu";
const description = "satoshiinu の個人サイト。開発中のプロジェクトを紹介します。";
const url = "https://mreina-tits-leaks.net";

export const metadata: Metadata = {
  metadataBase: new URL(url),
  title: siteName,
  description,
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: siteName,
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>
        <header className="site-header">
          <a className="site-logo" href="/">
            mreina-tits-leaks.net
          </a>
          <nav>
            <a href="#projects">Projects</a>
            <a href="#links">Links</a>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="site-footer">© 2026 satoshiinu</footer>
      </body>
    </html>
  );
}
