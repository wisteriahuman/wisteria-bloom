import React from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Providers } from "@/app/providers";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Wisteria Bloom",
  description: `
  Wisteria Bloomは学習リソース・ツールを提供するサイトです。
  学習の助けになるアプリなどを提供しています。
  `.trim(),
  metadataBase: new URL("https://wisteria-bloom.wisteria-io.com"),
  openGraph: {
    title: "Wisteria Bloom",
    description: `
    Wisteria Bloomは学習リソース・ツールを提供するサイトです。
    学習の助けになるアプリなどを提供しています。
    `.trim(),
    siteName: "Wisteria Bloom",
    type: "website",
    images: ["/images/wisteria_bloom.svg"],
  }
}

export const viewport = "width=device-width, initial-scale=1.0";


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="UTF-8" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="bg-gray-100">
        <Providers>
          <Header />
          <main className="relative min-h-screen">
            <div className="absolute inset-0 bg-gray-400 overflow-hidden flex items-center -z-50">
              <div className="w-screen h-64 absolute top-0 opacity-50 left-0 -my-40 -mx-64 bg-gray-300 rounded-full"></div>
              <div className="w-64 h-64 -mx-32 bg-gray-300 opacity-50 rounded-full"></div>
              <div className="w-64 h-64 ml-auto relative opacity-50 -mr-32 bg-gray-300 rounded-full"></div>
              <div className="w-screen h-64 absolute opacity-50 bottom-0 right-0 -my-40 -mx-64 bg-gray-300 rounded-full"></div>
            </div>
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}