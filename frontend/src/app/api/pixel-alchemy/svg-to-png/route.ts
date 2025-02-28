import { NextResponse, NextRequest } from 'next/server';
import { SERVERURL } from '@/common/urls';

export async function POST(request: NextRequest) {
    try {
        const formData = await request.formData();
        const res = await fetch(`${SERVERURL}api/pixel-alchemy/svg-to-png/`, {
            method: `POST`,
            body: formData,
        })
        const data = await res.json();
        console.log(data);
        return NextResponse.json({
            status: 200,
            png: data.png,
        });
    } catch(error) {
        console.error('Error fetching data:', error);

        const statusCode = error instanceof TypeError ? 503 : 500;
        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({
            status: statusCode,
            error: errorMessage,
        }, {
            status: statusCode,
        });
    };
}