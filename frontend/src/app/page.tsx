import type { Metadata } from "next";
import "@/app/globals.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Wisteria Bloom",
  description: `
  Wisteria BloomはWisteriaの個人サイトです。
  学習者向けの学習ツールやリソースも提供しています。
  `.trim(),
}

export default function Home() {
  return (
    <section>
      <Image
        src="/images/wisteria_bloom.svg"
        alt="wisteria_bloom"
        width={1000}
        height={500}
      />
    </section>
  );
}
