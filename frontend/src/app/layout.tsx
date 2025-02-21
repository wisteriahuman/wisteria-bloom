import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <title>Wisteria Bloom</title>
      </head>
      <body>
        <header>Wisteria Bloom</header>
        <main>{children}</main>
        <footer>©Wisteria Bloom</footer>
      </body>
    </html>
  )
}