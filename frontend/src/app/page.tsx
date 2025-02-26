import "@/app/globals.css";
import Image from "next/image";

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
