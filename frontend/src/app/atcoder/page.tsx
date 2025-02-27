"use client";

import "@/app/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import RandomContestCard from "@/components/atcoder/RandomContestCard";
import Spinner from "@/components/spinner/Spinner";

export default function AtCoderPage() {
    const [flag, setFlag] = useState(false);
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

    const handleRandomContestClick = async (FETCHURL: string) => {
        try {
            setFlag(true);
            const res = await fetch(FETCHURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data.url) {
                router.push(data.url);
                setTimeout(() => setFlag(false), 200);
            }
        } catch (error) {
            console.error("Error fetching contest URL:", error);
        }
    };

    return (
        <section className="relative text-groy-600 body-font">
            <span className={`
                absolute left-0 top-0 h-full w-1/2 bg-indigo-950 z-50
                transform origin-left transition-transform duration-500
                ${isClosedDoor ? "scale-x-100" : "scale-x-0"}
            `}></span>
            <span className={`
                absolute right-0 top-0 h-full w-1/2 bg-indigo-950 z-50
                transform origin-right transition-transform duration-500
                ${isClosedDoor ? "scale-x-100" : "scale-x-0"}
            `}></span>
            <span className={`
                absolute left-1/2 top-0 w-1 bg-yellow-50 z-50
                transform origin-center transition-all duration-500
                ${isClosedDoor ? "duration-1000" : "duration-75"}
                ${isCracked && isClosedDoor ? "h-full": "h-0"}
            `}></span>
            <div className="container px-5 py-24 mx-auto z-10">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="text-5xl font-medium title-font mb-4 text-white tracking-widest relative z-50">
                        AtCoder Random Contest
                    </h1>
                    <div className="lg:w-2/3 mx-auto leading-reloxed text-xl text-white">
                        <p>AtCoder Random Contest へようこそ！</p>
                        <p>下記の中からお好みのランダムコンテストに参加してください</p>
                    </div>
                </div>
                <div className="flex flex-wrap -m-4">
                    <div className="p-4 lg:w-1/2">
                        <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left bg-white rounded-lg p-4">
                            <RandomContestCard
                                img_src="/images/abc.svg"
                                title="ABC Random Contest"
                                subtitle="制限なしのランダム"
                                description="AtCoder Beginner Contest の過去の問題からランダムに出題されるよ！"
                                onClick={() => handleRandomContestClick("/api/atcoder/")}
                            />
                        </div>
                    </div>
                    <div className="p-4 lg:w-1/2">
                        <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left bg-white rounded-lg p-4">
                            <RandomContestCard
                                img_src="/images/a.svg"
                                title="ABC_A Random Contest"
                                subtitle="A問題のみのランダム"
                                description="AtCoder Beginner Contest の A問題 の過去の問題からランダムに出題されるよ！"
                                onClick={() => handleRandomContestClick("/api/atcoder/a")}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -m-4">
                    <div className="p-4 lg:w-1/2">
                        <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left bg-white rounded-lg p-4">
                            <RandomContestCard
                                img_src="/images/b.svg"
                                title="ABC_B Random Contest"
                                subtitle="B問題のみのランダム"
                                description="AtCoder Beginner Contest の B問題 の過去の問題からランダムに出題されるよ！"
                                onClick={() => handleRandomContestClick("/api/atcoder/b")}
                            />
                        </div>
                    </div>
                    <div className="p-4 lg:w-1/2">
                        <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left bg-white rounded-lg p-4">
                            <RandomContestCard
                                img_src="/images/c.svg"
                                title="ABC_C Random C"
                                subtitle="C問題のみのランダム"
                                description="AtCoder Beginner Contest の C問題 の過去の問題からランダムに出題されるよ！"
                                onClick={() => handleRandomContestClick("/api/atcoder/c")}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -m-4">
                    <div className="p-4 lg:w-1/2">
                        <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left bg-white rounded-lg p-4">
                            <RandomContestCard
                                img_src="/images/d.svg"
                                title="ABC_D Random Contest"
                                subtitle="D問題のみのランダム"
                                description="AtCoder Beginner Contest の D問題 の過去の問題からランダムに出題されるよ！"
                                onClick={() => handleRandomContestClick("/api/atcoder/d")}
                            />
                        </div>
                    </div>
                    <div className="p-4 lg:w-1/2">
                        <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left bg-white rounded-lg p-4">
                            <RandomContestCard
                                img_src="/images/e.svg"
                                title="ABC_E Random Contest"
                                subtitle="E問題のみのランダム"
                                description="AtCoder Beginner Contest の E問題 の過去の問題からランダムに出題されるよ！"
                                onClick={() => handleRandomContestClick("/api/atcoder/e")}
                            />
                        </div>
                    </div>
                </div>
                <div className="flex flex-wrap -m-4">
                    <div className="p-4 lg:w-1/2">
                        <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left bg-white rounded-lg p-4">
                            <RandomContestCard
                                img_src="/images/f.svg"
                                title="ABC_F Random Contest"
                                subtitle="F問題のみのランダム"
                                description="AtCoder Beginner Contest の F問題 の過去の問題からランダムに出題されるよ！"
                                onClick={() => handleRandomContestClick("/api/atcoder/f")}
                            />
                        </div>
                    </div>
                    <div className="p-4 lg:w-1/2">
                        <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left bg-white rounded-lg p-4">
                            <RandomContestCard
                                img_src="/images/g.svg"
                                title="ABC_G Random Contest"
                                subtitle="G問題のみのランダム"
                                description="AtCoder Beginner Contest の G問題 の過去の問題からランダムに出題されるよ！"
                                onClick={() => handleRandomContestClick("/api/atcoder/g")}
                            />
                        </div>
                    </div>
                </div>
            </div>
            {flag && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-75">
                    <Spinner />
                    <div className="">通信中</div>
                </div>
            )}
        </section>
    );
}