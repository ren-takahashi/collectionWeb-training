import type { Metadata } from "next";
import { Suspense } from "react";
import "./globals.css";
import Header from "@/components/Header/Header";
import Navigation from "@/components/Navigation/Navigation";
import SearchForm from "@/components/SearchForm/SearchForm";
import styles from "./layout.module.css";

export const metadata: Metadata = {
  // TODO: 本番公開時に実際のURLに変更する
  metadataBase: new URL("https://animal-figure-series.example.com"),
  title: "アニマルフィギュアシリーズアーカイブ",
  description: "アニマルフィギュアシリーズの個人アーカイブサイト",
  openGraph: {
    title: "アニマルフィギュアシリーズアーカイブ",
    description: "アニマルフィギュアシリーズの個人アーカイブサイト",
    siteName: "アニマルフィギュアシリーズアーカイブ",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/ogp.png", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/ogp.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Header />
        <div className={styles.wrapper}>
          <div className={styles.leftCol}>
            <Navigation />
          </div>
          <div className={styles.rightCol}>
            <Suspense fallback={null}>
              <SearchForm />
            </Suspense>
            <main className={styles.main}>{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
