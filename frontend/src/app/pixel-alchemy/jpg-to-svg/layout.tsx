import React from 'react'
import type { Metadata } from "next";


export const metadata: Metadata = {
    metadataBase: new URL("https://wisteria-bloom.wisteria-io.com"),
    title: "JPG to SVG Converter",
    description: "Convert your JPG images to SVG format",
    openGraph: {
        title: "JPG to SVG Converter",
        description: "Convert your JPG images to SVG format",
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