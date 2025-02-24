import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Wisteria Bloom</title>
      </head>
      <body className="bg-gray-100">
        <header>Wisteria Bloom</header>
        <main className="relative min-h-screen">
          <div className="absolute inset-0 bg-gray-400 overflow-hidden flex items-center">
            <div className="w-screen h-64 absolute top-0 opacity-50 left-0 -my-40 -mx-64 bg-gray-300 rounded-full"></div>
            <div className="w-64 h-64 -mx-32 bg-gray-300 opacity-50 rounded-full"></div>
            <div className="w-64 h-64 ml-auto relative opacity-50 -mr-32 bg-gray-300 rounded-full"></div>
            <div className="w-screen h-64 absolute opacity-50 bottom-0 right-0 -my-40 -mx-64 bg-gray-300 rounded-full"></div>
          </div>
          {children}
        </main>
        <footer>©Wisteria Bloom</footer>
      </body>
    </html>
  )
}