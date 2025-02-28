"use client";

import "@/app/globals.css";
import { useState, useEffect } from 'react';
import { useRouter } from "next/navigation";
import ToolCard from "@/components/pixel-alchemy/ToolCard";

export default function PixelAlchemy() {
    const [isClosedDoor, setIsClosedDoor] = useState(true);
    const [isCracked, setIsCracked] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const crackTimer = setTimeout(() => {
            setIsCracked(true);
        }, 500);
        const doorTimer = setTimeout(() => {
            setIsClosedDoor(false);
        }, 1300);
        return () => {
            clearTimeout(crackTimer);
            clearTimeout(doorTimer);
        };
    }, []);

    return (
        <section className="relative text-gray-600 body-font">
            <span className={`
                fixed left-0 top-0 h-screen w-1/2 bg-indigo-950 z-50
                transform origin-left transition-transform duration-500
                ${isClosedDoor ? "scale-x-100" : "scale-x-0"}
            `}></span>
            <span className={`
                fixed right-0 top-0 h-screen w-1/2 bg-indigo-950 z-50
                transform origin-right transition-transform duration-500
                ${isClosedDoor ? "scale-x-100" : "scale-x-0"}
            `}></span>
            <span className={`
                fixed left-1/2 top-0 w-1 bg-yellow-50 z-50
                transform origin-center transition-all duration-500
                ${isClosedDoor ? "duration-1000" : "duration-75"}
                ${isCracked && isClosedDoor ? "h-full": "h-0"}
            `}></span>
            <div className="container px-5 py-24 mx-auto z-10">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="text-5xl font-medium title-font mb-4 text-white tracking-widest relative z-50">
                        Pixel Alchemy
                    </h1>
                    <div className="lg:w-2/3 mx-auto leading-reloxed text-xl text-white">
                        <p>Pixel Alchemy へようこそ！</p>
                        <p>画像処理のツールがすぐに利用できます。</p>
                    </div>
                </div>
                <div className="flex flex-wrap -m-4">
                    <div className="p-4 lg:w-1/4">
                        <ToolCard
                            title="JPG to PNG"
                            description="JPG形式の画像をPNG形式に変換します。"
                            onMouseEnter={() => console.log("Mouse Enter")}
                            onMouseLeave={() => console.log("Mouse Leave")}
                            onClick={() => router.push("/pixel-alchemy/jpg-to-png")}
                            />
                    </div>
                    <div className="p-4 lg:w-1/4">
                        <ToolCard
                            title="PNG to JPG"
                            description="PNG形式の画像をJPG形式に変換します。"
                            onMouseEnter={() => console.log("Mouse Enter")}
                            onMouseLeave={() => console.log("Mouse Leave")}
                            onClick={() => router.push("/pixel-alchemy/png-to-jpg")}
                            />
                    </div>
                    <div className="p-4 lg:w-1/4">
                        <ToolCard
                            title="PNG to SVG"
                            description="PNG形式の画像をSVG形式に変換します。"
                            onMouseEnter={() => console.log("Mouse Enter")}
                            onMouseLeave={() => console.log("Mouse Leave")}
                            onClick={() => router.push("/pixel-alchemy/png-to-svg")}
                            />
                    </div>
                    <div className="p-4 lg:w-1/4">
                        <ToolCard
                            title="JPG to SVG"
                            description="JPG形式の画像をSVG形式に変換します。"
                            onMouseEnter={() => console.log("Mouse Enter")}
                            onMouseLeave={() => console.log("Mouse Leave")}
                            onClick={() => router.push("/pixel-alchemy/jpg-to-svg")}
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -m-4">
                    <div className="p-4 lg:w-1/4">
                        <ToolCard
                            title="SVG to PNG"
                            description="SVG形式の画像をPNG形式に変換します。"
                            onMouseEnter={() => console.log("Mouse Enter")}
                            onMouseLeave={() => console.log("Mouse Leave")}
                            onClick={() => router.push("/pixel-alchemy/svg-to-png")}
                        />
                    </div>
                    <div className="p-4 lg:w-1/4">
                        <ToolCard
                            title="SVG to JPG"
                            description="SVG形式の画像をJPG形式に変換します。"
                            onMouseEnter={() => console.log("Mouse Enter")}
                            onMouseLeave={() => console.log("Mouse Leave")}
                            onClick={() => router.push("/pixel-alchemy/svg-to-jpg")}
                        />
                    </div>
                    <div className="p-4 lg:w-1/4">
                        <ToolCard
                            title="PNG_to_PDF"
                            description="PNG形式の画像をPDF形式に変換します。"
                            onMouseEnter={() => console.log("Mouse Enter")}
                            onMouseLeave={() => console.log("Mouse Leave")}
                            onClick={() => router.push("/pixel-alchemy/png-to-pdf")}
                        />
                    </div>
                    <div className="p-4 lg:w-1/4">
                        <ToolCard
                            title="JPG to PDF"
                            description="JPG形式の画像をPDF形式に変換します。"
                            onMouseEnter={() => console.log("Mouse Enter")}
                            onMouseLeave={() => console.log("Mouse Leave")}
                            onClick={() => router.push("/pixel-alchemy/jpg-to-pdf")}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}