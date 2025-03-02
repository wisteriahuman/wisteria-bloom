import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[60] w-full bg-white border-b text-sm py-2.5">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <Link href="/" className="hover:underline">Wisteria Bloom</Link>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li className="p-2">
                    <a href="https://github.com/wisteriahuman/wisteria-bloom/">
                        <Image
                            alt="github"
                            src="/images/github.svg"
                            width={20}
                            height={20}
                        />
                    </a>
                </li>
                <li className="p-2">
                    <a href="https://twitter.com/wisteria_man/">
                        <Image
                            alt="twitter"
                            src="/images/twitter.svg"
                            width={25}
                            height={25}
                        />
                    </a>
                </li>
                <li className="p-2">
                    <a href="https://atcoder.jp/users/wisteriahuman/">
                        <Image
                            alt="atcoder"
                            src="/images/atcoder.svg"
                            width={25}
                            height={25}
                        />
                    </a>
                </li>
            </ul>
            </div>
        </footer>
    );
}