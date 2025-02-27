"use client";

import { useState, useEffect } from "react";
import Image from 'next/image';
import Spinner from "@/components/spinner/Spinner";

export default function JPEGToPNG() {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [flag, setFlag] = useState(false);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            const file = event.target.files[0];
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            const file = event.dataTransfer.files[0];
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const base64ToBlob = (base64: string, type: string) => {
        console.log(base64);
        const bin = atob(base64);
        const len = bin.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = bin.charCodeAt(i);
        }
        return new Blob([bytes], { type: type });
    }

    useEffect(() => {
        return () => {
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        <section className="relative text-gray-600 body-font">
            <div className="flex flex-col text-center w-full mb-20">
                <h1 className="text-5xl font-medium title-font mb-4 text-white tracking-widest relative z-50">
                    Convert JPG to PNG
                </h1>
                <div className="lg:w-2/3 mx-auto leading-reloxed text-xl text-white">
                    <p>JPG形式の画像をPNG形式に変換します。</p>
                </div>
            </div>
            <form
                className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto space-y-6 p-6 bg-gray-800 bg-opacity-50 rounded-xl shadow-lg"
                onSubmit={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    return false;
                }}
            >
            
                <div className="w-full">
                    <label
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-400 border-dashed rounded-lg cursor-pointer bg-gray-700 hover:bg-gray-600 transition-all duration-300"
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={handleDrop}
                    >
                        {!selectedFile ? (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-10 h-10 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                            </svg>
                            <p className="mb-2 text-sm text-gray-300">
                                <span className="font-semibold">クリックしてJPGファイルを選択</span> または ドラッグ&ドロップ
                            </p>
                            <p className="text-xs text-gray-400">JPGファイル (最大 10MB)</p>
                        </div>
                        ) : (
                            <div className="relative w-full h-full flex items-center justify-center">
                                <Image
                                    src={previewUrl || ''} 
                                    alt="プレビュー"
                                    width={100}
                                    height={100}
                                    style={{ width: "auto", height: "auto" }}
                                    className="max-h-60 max-w-full object-contain"
                                />
                                <div className="absolute bottom-2 right-2">
                                    <button 
                                        type="button"
                                        className="bg-gray-800 text-white p-1 rounded-full hover:bg-gray-900"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setSelectedFile(null);
                                            setPreviewUrl(null);
                                        }}
                                    >
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="image/jpeg"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                    </label>
                </div>
                
                <button 
                    type="button" 
                    className="px-8 py-3 text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-md hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 font-medium"
                    onClick={() => {
                        if (selectedFile) {
                            setFlag(true);
                            const formData = new FormData();
                            formData.append("jpg", selectedFile);
                            fetch("/api/pixel-alchemy/jpg-to-png", {
                                method: "POST",
                                body: formData,
                            }).then((response) => {
                                if (response.ok) {
                                    response.json().then((data) => {
                                        if (!data.png) {
                                            console.error("pngプロパティがレスポンスに含まれていません:", data);
                                            setFlag(false);
                                            return;
                                        }
                                        const base64Data = data.png;
                                        const base64Str = base64Data.includes(',') ? base64Data.split(',')[1] : base64Data;
                                        const blob = base64ToBlob(base64Str, "image/png");
                                        const url = URL.createObjectURL(blob);
                                        const a = document.createElement("a");
                                        a.href = url;
                                        a.download = "image.png";
                                        a.click();
                                        URL.revokeObjectURL(url);
                                        setFlag(false);
                                    })
                                } else {
                                    console.error("HTTPレスポンスが失敗しました:", response);
                                    setFlag(false);
                                }
                            }).catch((error) => {
                                console.error("エラーが発生しました:", error);
                                setFlag(false);
                            });
                        }
                    }}
                >
                    PNG に変換する
                </button>
            </form>
            {flag && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-75">
                    <Spinner />
                    <div className="">通信中</div>
                </div>
            )}
        </section>
    );
}