"use client";

import "@/app/globals.css";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Spinner from "@/components/spinner/Spinner";

interface SearchResult {
    title: string;
    tags: string;
    description: string;
    path: string;
}

export default function SearchPage() {
    const [results, setResults] = useState([]);
    const searchParams = useSearchParams();
    const query = searchParams.get("q")?.toLowerCase() || "";
    const [isSearch, setIsSearch] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setIsSearch(true);
                const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
                const data = await res.json();
                setResults(data.results || []);
                setIsSearch(false);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };
        if (query.trimStart() != "") {
            fetchData();
        } else {
            setResults([]);
        }
    }, [query])
    return (
        <section className="px-4 py-6">
            <h1 className="text-3xl font-bold mb-6 text-white">検索結果</h1>
            <div className="max-w-4xl mx-auto">
                {results.length > 0 ? (
                    results.map((result: SearchResult, index) => {
                        const absoluteUrl = typeof window !== "undefined"
                        ? new URL(result.path, window.location.origin).href
                        : result.path;
                        return (
                            <div key={index} className="bg-white/50 rounded-lg p-4">
                                <div className="mb-6 pb-4 border-b border-white">
                                    <a
                                        href={absoluteUrl}
                                        className="text-xl text-blue-600 hover:underline"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {result.title}
                                    </a>
                                    <p className="text-sm text-gray-700 mt-1">{absoluteUrl}</p>
                                    <p className="mt-2 text-base text-gray-800">{result.description}</p>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p>該当する結果が見つかりませんでした。</p>
                )}
            </div>
            {isSearch && (
                <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white">
                    <Spinner />
                    <div className="">検索中</div>
                </div>
            )}
        </section>
    );
}