import React from 'react'
import type { Metadata } from "next";


export const metadata: Metadata = {
    metadataBase: new URL("https://wisteria-bloom.wisteria-io.com"),
    title: "Pixel Alchemy",
    description: "さまざまな画像処理ツールがすぐに利用できます",
    openGraph: {
        title: "Pixel Alchemy",
        description: "さまざまな画像処理ツールがすぐに利用できます",
        siteName: "Wisteria Bloom",
        type: "website",
        images: ["/images/wisteria_bloom.svg"]
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