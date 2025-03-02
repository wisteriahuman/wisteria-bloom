import React from 'react';
import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://wisteria-bloom.wisteria-io.com"),
    title: "Wisteria Bloom | About",
    description: "Wisteria Bloomについてのページです。",
    openGraph: {
        title: "Wisteria Bloom | About",
        description: "Wisteria Bloomについてのページです。",
        siteName: "Wisteria Bloom",
        type: "website",
        images: ["/images/wisteria_bloom.svg"],
    },
    robots: "noindex, nosnippet",
};

export const viewport = "width=device-width, initial-scale=1.0";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
        </>
    )
}