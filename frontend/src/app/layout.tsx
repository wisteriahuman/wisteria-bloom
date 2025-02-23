import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
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