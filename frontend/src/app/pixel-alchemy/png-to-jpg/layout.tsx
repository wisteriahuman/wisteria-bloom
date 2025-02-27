import React from 'react'
import type { Metadata } from "next";


export const metadata: Metadata = {
    metadataBase: new URL("https://wisteria-bloom.wisteria-io.com"),
    title: "PNG to JPG Converter",
    description: "Convert your PNG images to JPG format",
    openGraph: {
        title: "PNG to JPG Converter",
        description: "Convert your PNG images to JPG format",
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