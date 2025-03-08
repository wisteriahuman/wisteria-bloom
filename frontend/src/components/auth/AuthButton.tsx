"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import axios from "axios";

export function AuthButton() {
    const { data: session, status } = useSession();
    const loading = status === "loading";

    useEffect(() => {
        const sendTokenToBackend = async () => {
            if (session?.idToken) {
                try {
                    console.log("Googleトークンをバックエンドに送信:", session.idToken?.substring(0, 20) + "...");
                    const response = await axios.post("/api/auth/google/", {
                        token: session.idToken
                    });
                    console.log("バックエンド認証成功:", response.data);
                    localStorage.setItem('accessToken', response.data.access);
                    localStorage.setItem('refreshToken', response.data.refresh);
                } catch (error) {
                    console.error("バックエンド認証エラー:", error);
                }
            } else {
                console.log("トークンがありません");
            }
        };
        if (session) {
            sendTokenToBackend();
        }
    }, [session]);

    if (loading) {
        return (
            <div className="bg-black hover:bg-gray-900 p-2 md:p-6 w-auto md:w-40 text-center text-white">
                <span>読み込み中...</span>
            </div>
        );
    }

    if (session) {
        return (
            <div className="bg-black hover:bg-gray-900 p-2 md:p-6 w-auto md:w-auto text-center flex items-center justify-center gap-2 text-white">
                {session.user?.image && (
                    <Image
                        src={session.user.image}
                        alt="User"
                        width={24}
                        height={24}
                        className="rounded-full"
                    />
                )}
                <button onClick={() => signOut()}>ログアウト</button>
            </div>
        );
    }

    return (
        <div className="bg-black hover:bg-gray-900 p-2 md:p-6 w-24 md:w-auto text-center text-white">
            <button onClick={() => signIn("google")}>ログイン</button>
        </div>
    )
}