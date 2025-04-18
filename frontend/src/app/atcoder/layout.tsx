import React from 'react';
import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://wisteria-bloom.wisteria-io.com"),
    title: "AtCoder Random Contest",
    description: "AtCoder Random Contest にようこそ！AtCoder Beginner Contest の過去問題をランダムに解くことができます",
    openGraph: {
        title: "AtCoder Random Contest",
        description: "AtCoder Random Contest にようこそ！AtCoder Beginner Contest の過去問題をランダムに解くことができます",
        siteName: "Wisteria Bloom",
        type: "website",
        images: ["/images/wisteria-bloom.svg"],
    },
};

export const viewport = "width=device-width, initial-scale=1.0";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}