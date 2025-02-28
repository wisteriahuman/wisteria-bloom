"use client";

import Image from 'next/image';

interface InputFileFormProps {
    selectedFile: File | null;
    setSelectedFile: (file: File | null) => void;
    previewUrl: string | null;
    setPreviewUrl: (url: string | null) => void;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onDrop: (event: React.DragEvent<HTMLLabelElement>) => void;
    onSubmit: () => void;
    buttonLabel: string;
    children: React.ReactNode;
}

export default function InputFileForm({
    selectedFile,
    setSelectedFile,
    previewUrl,
    setPreviewUrl,
    onChange,
    onDrop,
    onSubmit,
    buttonLabel,
    children,
}: InputFileFormProps) {
    return (
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
                    onDrop={onDrop}
                >
                    {!selectedFile ? (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        {children}
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
                        accept="image/png"
                        className="hidden"
                        onChange={onChange}
                    />
                </label>
            </div>
            
            <button 
                type="button" 
                className="px-8 py-3 text-white bg-gradient-to-r from-purple-600 to-blue-500 rounded-md hover:from-purple-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-300 font-medium"
                onClick={onSubmit}
            >
                {buttonLabel}
            </button>
        </form>
    );
}