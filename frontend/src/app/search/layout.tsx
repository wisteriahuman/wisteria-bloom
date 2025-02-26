import React from 'react';
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
    metadataBase: new URL("https://wisteria-bloom.wisteria-io.com"),
    title: "Wisteria Bloom | 検索結果",
    description: "Wisteria Bloomの検索結果ページです。",
    openGraph: {
        title: "Wisteria Bloom | 検索結果",
        description: "Wisteria Bloomの検索結果ページです。",
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