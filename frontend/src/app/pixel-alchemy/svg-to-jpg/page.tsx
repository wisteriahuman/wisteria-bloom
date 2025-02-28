"use client";

import { useState } from "react";
import InputFileForm from "@/components/pixel-alchemy/InputFileForm";
import Spinner from "@/components/spinner/Spinner";

export default function SVGToJPG() {
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
    }
    const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
        event.preventDefault();
        if (event.dataTransfer.files && event.dataTransfer.files[0]) {
            const file = event.dataTransfer.files[0];
            setSelectedFile(file);
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    }

    async function handleSubmit() {
        if (selectedFile) {
            setFlag(true);
            const formData = new FormData();
            formData.append("svg", selectedFile);
            fetch("/api/pixel-alchemy/svg-to-jpg", {
                method: "POST",
                body: formData,
            }).then((reponse) => {
                if (reponse.ok) {
                    reponse.json().then((data) => {
                        if (!data.jpg) {
                            console.error("jpgプロパティがレスポンスに含まれていません:", data);
                            setFlag(false);
                            return;
                        }
                        const blob = new Blob([data.jpg], { type: "image/jpeg" })
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "image.jpg";
                        a.click();
                        URL.revokeObjectURL(url);
                        setFlag(false);
                    })
                } else {
                    console.error("HTTPレスポンスが失敗しました:", reponse);
                    setFlag(false);
                }
            }).catch((error) => {
                console.error("エラーが発生しました:", error);
                setFlag(false);
            })
        }
    }
    return (
        <section className="relative text-gray-600 body-font">
            <div className="flex flex-col text-center w-full mb-20">
                <h1 className="text-5xl font-medium title-font mb-4 text-white tracking-widest relative z-50">
                    SVG to JPG
                </h1>
                <div className="lg:w-2/3 mx-auto leading-relaxed text-xl text-white">
                    <p>SVG形式の画像をJPG形式に変換します。</p>
                </div>
            </div>
            <InputFileForm
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                previewUrl={previewUrl}
                setPreviewUrl={setPreviewUrl}
                onChange={handleFileChange}
                onDrop={handleDrop}
                onSubmit={handleSubmit}
                buttonLabel="JPGに変換する"
            >
                <svg className="w-10 h-10 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="mb-2 text-sm text-gray-300">
                    <span className="font-semibold">クリックしてSVGファイルを選択</span> または ドラッグ&ドロップ
                </p>
                <p className="text-xs text-gray-400">SVGファイル (最大 10MB)</p>
            </InputFileForm>
            {flag && (
                <div>
                    <Spinner />
                    <p>通信中</p>
                </div>
            )}
        </section>
    );
}