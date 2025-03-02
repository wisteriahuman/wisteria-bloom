"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';


export default function Header() {
    const [isCoursesOpen, setIsCoursesOpen] = useState(false);
    const [isToolsOpen, setIsToolsOpen] = useState(false);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isCoursesInDrawerOpen, setIsCoursesInDrawerOpen] = useState(false);
    const [isToolsInDrawerOpen, setIsToolsInDrawerOpen] = useState(false);
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");


    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim() == "") return;
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setSearchQuery("");
    };

    return (
        <header className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-[60] w-full bg-white border-b text-sm py-2.5">
            <nav className="px-4 sm:px-6 flex basis-full items-center w-full mx-auto">
                <div className="mr-5 flex items-center">
                    <Image
                        alt="wisteria_bloom"
                        src="/images/wisteria_bloom.svg"
                        width={100}
                        height={100}
                        style={{ width: "auto", height: "70px"}}
                    />
                </div>
                <div className="hidden lg:flex relative self-end pb-1 w-full items-center justify-between grow max-w-[10rem]">
                    <div className="!visible hidden grow items-center lg:!flex">
                        <ul className="text-xl list-none p-0 flex flex-row items-center gap-8">
                            <li>
                                <Link href="/" className="flex item-center border-transparent font-semibold border-b-4 hover:border-border-brand-active pb-2 ease-in-out hover:underline">Home</Link>
                            </li>
                            <li>
                                <button
                                    className="dropdown inline-block relative"
                                    onMouseEnter={() => setIsCoursesOpen(true)}
                                    onMouseLeave={() => setIsCoursesOpen(false)}
                                    onClick={() => setIsCoursesOpen(prev => !prev)}
                                >
                                    <div
                                        className="w-max"
                                    >
                                        <div className={`border-transparent font-semibold border-b-4 hover:border-border-brand-active pb-2 ease-in-out ${isCoursesOpen ? "underline text-indigo-400" : "hover:underline"}`}>
                                            <span>Courses</span>
                                        </div>
                                    </div>
                                    <ul className={`dropdown-content absolute left-0 right-0 z-[1000] mt-0 rounded-md w-max border-none bg-white bg-clip-padding shadow-lg ${isCoursesOpen ? "" : "hidden"}`}>
                                        <li className="dropdown">
                                            <Link className="w-52 no-underline flex items-center hover:text-accent py-3 px-4 hover:underline" href="/atcoder">AtCoder Random Contest</Link>
                                        </li>
                                    </ul>
                                </button>
                            </li>
                            <li>
                                <button
                                    className="dropdown inline-block relative"
                                    onMouseEnter={() => setIsToolsOpen(true)}
                                    onMouseLeave={() => setIsToolsOpen(false)}
                                    onClick={() => setIsToolsOpen(prev => !prev)}    
                                >
                                    <div
                                        className="w-max"
                                    >
                                        <div className={`border-transparent font-semibold border-b-4 hover:border-border-brand-active pb-2 ease-in-out ${isToolsOpen ? "underline text-indigo-400" : "hover:underline"}`}>
                                            <span>Tools</span>
                                        </div>
                                    </div>
                                    <ul className={`dropdown-content absolute left-0 right-0 z-[1000] mt-0 rounded-md w-max border-none bg-white bg-clip-padding shadow-lg ${isToolsOpen ? "" : "hidden"}`}>
                                        <li className="dropdown">
                                            <Link className="w-52 no-underline flex items-center hover:text-accent py-3 px-4  hover:underline" href="/pixel-alchemy">Pixel Alchemy</Link>
                                        </li>
                                    </ul>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="flex items-center pr-3 lg:pl-16 justify-end ml-auto md:justify-between md:gap-x-3">
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
                                className="py-2 ps-10 pr-16 block w-full bg-gray-100 border-gray-200 rounded-lg text-sm focus:outline-none focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none"
                                placeholder="Search..."
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </form>
                    </div>
                </div>

                <div className="p-1">
                    <button onClick={() => setIsDrawerOpen(prev => !prev)} className="p-1 lg:p-2 rounded-full hover:bg-gray-100 active:bg-gray-200">
                        <Image
                            alt="menu"
                            src="/images/burger-menu.svg"
                            width={60}
                            height={60}
                        />
                    </button>
                </div>
            </nav>
            <nav 
                className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-autotransition-transform duration-200 bg-white w-64
                    ${isDrawerOpen ? "translate-x-0" : "translate-x-full"}
                    `}>
                    <h5 className="text-xl p-1 font-semibold text-gray-500 uppercase">Menu</h5>
                    <button
                        className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 active:bg-gray-200"
                        onClick={() => setIsDrawerOpen(false)}
                    >
                        <Image
                            alt="close"
                            src="/images/cross.svg"
                            width={24}
                            height={24}
                        />
                    </button>
                    <div className="py-4 overflow-y-auto">
                        <ul className="space-y-2 font-medium text-3xl">
                            <li className="py-4 border-b-2 border-black">
                                <Link href="/" className="hover:underline font-semibold">Home</Link>
                            </li>
                            <li className="py-4 border-b-2 border-black">
                                <button
                                    className=""
                                    onClick={() => setIsCoursesInDrawerOpen(prev => !prev)}
                                    >
                                    <div className="flex items-center justify-between font-semibold">
                                        <span>Courses</span>
                                        <Image
                                            alt="arrow"
                                            src="/images/arrow-left.svg"
                                            className={`
                                                pl-2 transition-transform duration-200
                                                ${isCoursesInDrawerOpen ? "-rotate-90 translate-y-2 translate-x-2" : "rotate-0"}
                                                `}
                                            width={30}
                                            height={30}
                                        />
                                    </div>
                                </button>
                                <ul className={`
                                        overflow-hidden text-xl
                                        ${isCoursesInDrawerOpen ? "max-h-40" : "max-h-0"}
                                    `}>
                                    <li
                                        className="pl-3 border-l-2 border-black py-2"
                                    >
                                        <Link href="/atcoder" className="hover:underline">AtCoder Random Contest</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className="py-4 border-b-2 border-black">
                                <button
                                    className=""
                                    onClick={() => setIsToolsInDrawerOpen(prev => !prev)}
                                >
                                    <div className="flex items-center justify-between font-semibold">
                                        <span>Tools</span>
                                        <Image
                                            alt="arrow"
                                            src="/images/arrow-left.svg"
                                            className={`
                                                pl-2 transition-transform duration-200
                                                ${isToolsInDrawerOpen ? "-rotate-90 translate-y-2 translate-x-2" : "rotate-0"}
                                                `}
                                            width={30}
                                            height={30}
                                        />
                                    </div>
                                </button>
                                <ul className={`
                                    overflow-hidden text-xl
                                    ${isToolsInDrawerOpen ? "max-h-40" : "max-h-0"}
                                    `}>
                                    <li className="pl-4 border-l-2 border-black py-2">
                                        <Link href="/pixel-alchemy" className="hover:underline">Pixel Alchemy</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
            </nav>
        </header>
    );
}