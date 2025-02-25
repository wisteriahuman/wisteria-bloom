"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';


export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        }
    }, [dropdownRef]);


    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim() == "") return;
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    };

    return (
        <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[60] w-full bg-white border-b text-sm py-2.5 dark:bg-neutral-800 dark:border-neutral-700">
            <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
                <div className="mr-5 flex items-center">
                    <Image
                        alt="wisteria_bloom"
                        src="/images/wisteria_bloom.svg"
                        width={150}
                        height={50}
                    />
                </div>
                <div className="hidden lg:flex relative self-end pb-3 w-full items-center justify-between grow max-w-[10rem]">
                    <div className="!visible hidden grow items-center lg:!flex">
                        <ul className="list-none p-0 flex flex-row items-center gap-8">
                            <li>
                                <Link href="/" className="flex item-center text-sm border-transparent font-semibold border-b-4 hover:border-border-brand-active pb-2 ease-in-out hover:underline">Home</Link>
                            </li>
                            <li>
                                <div className="dropdown inline-block relative" ref={dropdownRef}>
                                    <button
                                        id="courses-btn"
                                        name="courses-btn"
                                        className="w-max"
                                        onClick={() => setIsDropdownOpen(prev => !prev)}
                                    >
                                        <div className={`text-sm border-transparent font-semibold border-b-4 hover:border-border-brand-active pb-2 ease-in-out ${isDropdownOpen ? "underline text-indigo-400" : "hover:underline"}`}>
                                            <span>Courses</span>
                                        </div>
                                    </button>
                                    <ul className={`dropdown-content absolute left-0 right-0 z-[1000] mt-0 rounded-md w-max border-none bg-white bg-clip-padding shadow-lg ${isDropdownOpen ? "" : "hidden"}`}>
                                        <li className="dropdown">
                                            <a className="w-52 no-underline flex items-center hover:text-accent py-3 px-4" href="/atcoder">AtCoder</a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="w-full flex items-center justify-end ml-auto md:justify-between gap-x-1 md:gap-x-3">
                    <div className="md:block">
                        <form className="relative" onSubmit={handleSearch}>
                            <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 ps-3.5">
                                <Image
                                    alt="search"
                                    src="/images/search.svg"
                                    width={24}
                                    height={24}
                                />
                            </div>
                            <input
                                type="text"
                                className="py-2 ps-10 pr-16 block w-full bg-gray-50 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder:text-neutral-400 dark:focus:ring-neutral-600"
                                placeholder="Search..."
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
                    </div>
                </div>
            </nav>
        </header>
    );
}