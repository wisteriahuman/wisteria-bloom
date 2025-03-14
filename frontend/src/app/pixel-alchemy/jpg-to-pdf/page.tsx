"use client";

import { useState } from "react";
import InputFileForm from "@/components/pixel-alchemy/InputFileForm";
import Spinner from "@/components/spinner/Spinner";

export default function PNGToPDF() {
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

    async function handleSubmit() {
        if (selectedFile) {
            setFlag(true);
            const formData = new FormData();
            formData.append("jpg", selectedFile);
            fetch("/api/pixel-alchemy/jpg-to-pdf", {
                method: "POST",
                body: formData,
            }).then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        if (!data.pdf) {
                            console.error("pdfプロパティがレスポンスに含まれていません:", data);
                            setFlag(false);
                            return;
                        }
                        const binaryString = atob(data.pdf);
                        const bytes = new Uint8Array(binaryString.length);
                        for (let i = 0; i < binaryString.length; i++) {
                            bytes[i] = binaryString.charCodeAt(i);
                        }
                        const blob = new Blob([bytes], { type: "application/pdf" });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement("a");
                        a.href = url;
                        a.download = "image.pdf";
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
            })
        }
    }
    return (
        <section className="relative text-gray-600 body-font">
            <div className="flex flex-col text-center w-full mb-20">
                <h1 className="text-5xl font-medium title-font mb-4 text-white tracking-widest relative z-50">
                    Convert JPG to PDF
                </h1>
                <div className="lg:w-2/3 mx-auto leading-relaxed text-xl text-white">
                    <p>JPG形式の画像をPDF形式に変換します。</p>
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
                buttonLabel="PDFに変換する"
            >
                <svg className="w-10 h-10 mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                </svg>
                <p className="mb-2 text-sm text-gray-300">
                    <span className="font-semibole">クリックしてJPGファイルを選択</span> または ドラッグ&ドロップ
                </p>
                <p className="text-xs text-gray-400">JPGファイル (最大 10MB)</p>
            </InputFileForm>
            {flag && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white bg-opacity-75">
                    <Spinner />
                    <p>通信中</p>
                </div>
            )}
        </section>
    );
}