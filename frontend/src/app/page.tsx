"use client";

import "@/app/globals.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {

  const msg_pairs = [
    ["Skills", "Future"],
    ["Curiosity", "Genius"],
    ["Passion", "Path"],
    ["Imagination", "World"],
    ["Mind", "Creativity"],
    ["Knowledge", "Wisdom"],
  ]

  const [index, setIndex] = useState(0);
  const [showCourses, setShowCourses] = useState(false);
  const [showTools, setShowTools] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % msg_pairs.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [msg_pairs.length]);

  const getTweetUrl = () => {
    const text = `Nurture Your ${msg_pairs[index][0]}, Bloom Your ${msg_pairs[index][1]} with Wisteria Bloom! by @wisteria_man\n`;
    const url = "https://wisteria-bloom.wisteria-io.com";
    const hashtags = "WisteriaBloom";

    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}&hashtags=${hashtags}`;
  };

  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center gap-6 w-full mx-auto p-6 bg-gray-600">
        <Image
          src="/images/wisteria_bloom_FFFFFF.svg"
          alt="wisteria_bloom"
          width={100}
          height={100}
          style={{ width: "auto", height: "auto" }}
          className="max-h-40 md:max-h-60 max-w-full object-contain rounded-xl"
        />
        <div className="text-2xl md:text-4xl font-medium text-white text-left">
          <div className="relative h-8 mb:h-10">
            <span className="absolute whitespace-nowrap">Nurture Your </span>
            {msg_pairs.map((item, idx) => (
            <span
              key={idx}
              className={`absolute left-[150px] md:left-[230px] transition-all duration-1000 ease-in-out whitespace-nowrap ${
                index==idx
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 -translate-y-4"
              }`}
            >
              {item[0]}
            </span>
          ))}
          </div>
          <div className="relative h-8 md:h-10 mt-1 md:mt-2">
            <span className="absolute whitespace-nowrap">Bloom Your </span>
            {msg_pairs.map((item, idx) => (
            <span
              key={idx}
              className={`absolute left-[135px] md:left-[205px] transition-all duration-1000 ease-in-out whitespace-nowrap ${
                index==idx
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
              }`}>
                {item[1]}
            </span>
          ))}
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 md:top-[245px] flex text-white text-2xl md:text-3xl">
          <a className="bg-black hover:bg-gray-900 p-2 md:p-6 w-24 md:w-40 text-center border-r border-white" href="about">
            About
          </a>
          <a
            className="bg-black hover:bg-gray-900 p-2 md:p-6 w-24 md:w-40 text-center"
            href={getTweetUrl()}
            target="_blank"
            rel="noopener noreferrer"
          >  
            Tweet
          </a>
      </div>
      <div className="flex flex-col items-center justify-center mt-20 px-4 md:px-8 max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-green-600">
          ようこそ！Wisteria Bloomへ
        </h1>
        
        <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-green-600 rounded mb-8"></div>
        
        <p className="text-xl md:text-2xl text-black mb-6">
          あなたの学びをサポートする学習リソース・ツールの提供サイト
        </p>
        
        <div className="flex flex-col md:flex-row gap-6 mt-8 w-full md:items-start">
          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-purple-600 mb-3">Courses</h3>
            <p className="text-gray-600">授業やAtCoderなど、さまざまな学習コースを提供しています。</p>
            <button
              className="w-full bg-gray-200 mt-5 hover:bg-gray-300 border-b border-black active:bg-gray-400 p-1"
              onClick={() => setShowCourses(prev => !prev)}
            >
              コース一覧
            </button>
            {showCourses && (
              <ul className="mt-4 bg-white rounded-lg border border-gray-100 shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
                    <li className="border-b border-gray-100 last:border-b-0 transition-colors hover:bg-purple-50">
                        <Link
                          className="flex py-3 px-4 text-gray-700 hover:text-purple-600 transition-colors items-center"
                          href="/atcoder"
                        >
                          <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                          AtCoder
                        </Link>
                    </li>
              </ul>
            )}
          </div>
          
          <div className="w-full mb-6 md:w-1/2 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-purple-600 mb-3">Tools</h3>
            <p className="text-gray-600">
              学習をより効率的にするツールを提供しています。
            </p>
            <button
              className="w-full bg-gray-200 mt-5 hover:bg-gray-300 border-b border-black active:bg-gray-400 p-1"
              onClick={() => setShowTools(prev => !prev)}
            >
              ツール一覧
            </button>
            {showTools && (
              <ul className="mt-4 bg-white rounded-lg border border-gray-100 shadow-lg overflow-hidden transition-all duration-300 ease-in-out">
                    <li className="border-b border-gray-100 last:border-b-0 transition-colors hover:bg-purple-50">
                        <Link
                          className="flex py-3 px-4 text-gray-700 hover:text-purple-600 transition-colors items-center"
                          href="/pixel-alchemy"
                        >
                          <span className="w-2 h-2 rounded-full bg-purple-400 mr-2"></span>
                          Pixel Alchemy
                        </Link>
                    </li>
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
