"use client";

import { useState } from "react";
import Image from 'next/image'

interface RandomContestCardProps {
    img_src: string;
    title: string;
    subtitle: string;
    description: string;
    onClick: () => void;
}

export default function RandomContestCard({
    img_src,
    title,
    subtitle,
    description,
    onClick,
}: RandomContestCardProps) {
    const [flag, setFlag] = useState(false);

    const handleClick = () => {
        setFlag(true);
        onClick();
        setTimeout(() => setFlag(false), 300);
    };

    return (
        <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
            <Image
                alt="image"
                className="flex-shrink-0 rounded-lg w-48 h-48 object-cover object-center sm:mb-0 mb-4"
                src={img_src}
                width={24}
                height={24} 
            />
            <div className="flex-grow sm:pl-8">
                <h2 className="title-font font-medium text-lg text-gray-900">{title}</h2>
                <h3 className="text-gray-500 mb-3">{subtitle}</h3>
                <p className="mb-4">{description}</p>
                <button
                    className={`
                        item-center justify-center
                        relative inline-flex items-center px-12 py-3
                        overflow-hidden text-lg font-medium text-indigo-600
                        border-2 border-indigo-600 rounded-full
                        hover:text-white group hover:bg-gray-50
                    `}
                    onClick={handleClick}
                >
                    {/*ホバー時のアニメーション*/}
                    <span className={`
                        absolute left-0 block w-full h-0 transition-all bg-indigo-600
                        opacity-100 group-hover:h-full top-1/2 group-hover:top-0 duration-400 ease
                    `}></span>
                    {/*クリック時のアニメーション*/}
                    <span className={`
                        absolute w-0 h-0 transition-all duration-300 ease-out bg-white rounded-full
                        ${flag ? "w-44 h-44 opacity-10" : "w-0 h-0 opacity-0"}
                    `}></span>
                    <span className="relative">参加する</span>
                    <span className={`
                        absolute right-0 flex items-center justify-start
                        w-10 n-10 duration-300 transform translate-x-full
                        group-hover:translate-x-0 ease
                    `}>
                        <Image
                            alt="icon"
                            className="size-5 rtl:rotate-180 group-hover:invert"
                            src="/images/arrow-right-circle.svg"
                            width={24}
                            height={24}
                        />
                    </span>
                </button>
            </div>
        </div>
    );
}