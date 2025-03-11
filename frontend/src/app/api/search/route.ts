import { NextResponse, NextRequest } from 'next/server';
import { SERVERURL } from '@/common/urls';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = request.nextUrl;
        const query = searchParams.get('q') || '';
        const res = await fetch(`${SERVERURL}/api/pages/search/?q=${query}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await res.json();
        return NextResponse.json({
            status: 200,
            results: data,
        });
    } catch (error) {
        console.error('Error fetching data:', error);

        const statusCode = error instanceof TypeError ? 503 : 500;
        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';
        return NextResponse.json({
            status: statusCode,
            error: errorMessage
        }, {
            status: statusCode
        });
    }
}