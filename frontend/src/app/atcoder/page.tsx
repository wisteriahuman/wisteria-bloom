"use client";

import "@/app/globals.css";
import { useRouter } from "next/navigation";
import RandomContestCard from "@/components/atcoder/RandomContestCard";

export default function AtCoderPage() {
    const router = useRouter();

    const handleRandomContestClick = async (FETCHURL: string) => {
        try {
            const res = await fetch(FETCHURL, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data.url) {
                router.push(data.url);
            }
        } catch (error) {
            console.error("Error fetching contest URL:", error);
        }
    };

    return (
        <section className="text-groy-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-20">
                    <h1 className="text-2xl font-medium title-font mb-4 text-gray-900 tracking-widest">AtCoder Random Contest</h1>
                    <div className="lg:w-2/3 mx-auto leading-reloxed text-base">
                        <p>AtCoder Random Contest へようこそ！</p>
                        <p>下記の中からお好みのランダムコンテストに参加してください</p>
                    </div>
                </div>
                <div className="flex flex-wrap -m-4">
                    <div className="p-4 lg:w-1/2">
                        <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left">
                            <RandomContestCard
                                img_src="/images/abc.svg"
                                title="ABC Random Contest"
                                subtitle="制限なしのランダム"
                                description="AtCoder Beginner Contest の過去の問題からランダムに出題されるよ！"
                                onClick={() => handleRandomContestClick("/api/atcoder/")}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}