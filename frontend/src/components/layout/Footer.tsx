import Link from "next/link";

export default function Footer() {
    return (
        <footer className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[60] w-full bg-white border-b text-sm py-2.5 dark:bg-neutral-800 dark:border-neutral-700">
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2025 <Link href="/" className="hover:underline">Wisteria Bloom</Link>. All Rights Reserved.
            </span>
            <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                <li>
                    <a href="#" className="hover:underline me-4 md:me-6">About</a>
                </li>
            </ul>
            </div>
        </footer>
    );
}