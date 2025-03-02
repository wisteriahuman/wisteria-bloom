"use client";

import { useState } from "react";
import Link from "next/link";

export default function About() {
    const [showCourses, setShowCourses] = useState(false);
    const [showTools, setShowTools] = useState(false);
    
    return (
        <section className="px-4 py-12 md:py-20 max-w-5xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-green-600">
                    Wisteria Bloomについて
                </h1>
                <div className="w-32 h-1 bg-gradient-to-r from-purple-500 to-green-600 rounded mx-auto mb-8"></div>
                <p className="text-xl text-gray-700 max-w-3xl mx-auto">
                    学びの旅をサポートし、あなたの可能性を咲かせるための学習プラットフォーム
                </p>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-purple-600 mb-6">私のミッション</h2>
                <p className="text-gray-700 mb-6 leading-relaxed">
                    Wisteria Bloomは、学習者が自分のペースで知識を深め、スキルを磨くための環境を提供することをミッションとしています。<br />
                    藤（Wisteria）のように美しく広がる知識の枝を育て、あなたの才能を花開かせるお手伝いをします。
                </p>
                <p className="text-gray-700 leading-relaxed">
                    私は、テクノロジーと教育の力を融合させ、誰もがアクセスしやすく、楽しく学べるリソースとツールを開発しています。<br />
                    一人ひとりの「学び」に寄り添い、未来への可能性を広げるパートナーでありたいと考えています。
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-purple-600 text-xl font-bold">C</span>
                        </div>
                        <h3 className="text-xl font-semibold text-purple-600">コース</h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                        プログラミングスキル向上のための様々なコースを提供しています。特にAtCoderプログラミングコンテストの問題を通じて、アルゴリズムとデータ構造の知識を深められます。
                    </p>
                    <ul className="list-disc pl-5 text-gray-600">
                        <li>AtCoderランダムコンテスト</li>
                        <li>アルゴリズム学習リソース</li>
                        <li>問題解決能力の養成</li>
                    </ul>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                    <div className="flex items-center mb-4">
                        <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-purple-600 text-xl font-bold">T</span>
                        </div>
                        <h3 className="text-xl font-semibold text-purple-600">ツール</h3>
                    </div>
                    <p className="text-gray-700 mb-4">
                        学習をサポートする便利なツールを開発・提供しています。実践的なスキルを身につけながら、創造性を発揮できる環境を整えています。
                    </p>
                    <ul className="list-disc pl-5 text-gray-600">
                        <li>Pixel Alchemy - 画像処理ツール</li>
                        <li>プログラミング支援ツール</li>
                        <li>インタラクティブな学習体験</li>
                    </ul>
                </div>
            </div>

            <div className="bg-gradient-to-r from-purple-50 to-green-50 p-8 rounded-lg mb-12">
                <h2 className="text-2xl md:text-3xl font-semibold text-center mb-6">私のビジョン</h2>
                <p className="text-gray-700 text-center max-w-3xl mx-auto leading-relaxed">
                    「Nurture Your Skills, Bloom Your Future」というスローガンのもと、
                    一人ひとりの好奇心と情熱を大切にし、知識の種を育て、
                    未来に向けて花開かせる手助けをすることを目指しています。
                    テクノロジーの進化と共に、私も常に成長し続けます。
                </p>
            </div>

            <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">学びの旅を始めましょう</h3>
                <div className="flex flex-wrap justify-center gap-4">
                    <button
                        className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                        onClick={() => {
                            setShowCourses(prev => !prev);
                            setShowTools(false);
                        }}
                    >
                        コースを探す
                    </button>
                    <button
                        className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                        onClick={() => {
                            setShowTools(prev => !prev)
                            setShowCourses(false);
                        }}
                    >
                        ツールを試す
                    </button>
                </div>
                {showCourses && (
                    <div>
                        <h1 className="text-2xl font-semibold text-purple-600 mt-8">コース一覧</h1>
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
                    </div>
                )}
                {showTools && (
                    <div>
                        <h1 className="text-2xl font-semibold text-purple-600 mt-8">ツール一覧</h1>
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
                    </div>
                )}
            </div>
        </section>
    );
}