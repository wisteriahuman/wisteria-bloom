import { NextResponse, NextRequest } from "next/server";
import { SERVERURL } from "@/common/urls";


export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const res = await fetch(`${SERVERURL}/api/pixel-alchemy/png-to-pdf/`, {
            method: "POST",
            body: formData,
        });
        const data = await res.json();
        return NextResponse.json({
            status: 200,
            pdf: data.pdf,
        });
    } catch (error) {
        console.error("Error fetching data:", error);

        const statusCode = error instanceof TypeError ? 503 : 500;
        const errorMessage = error instanceof Error ? error.message : "Internal"
        return NextResponse.json({
            status: statusCode,
            error: errorMessage,
        }, {
            status: statusCode,
        });
    };
}