import { NextResponse, NextRequest } from 'next/server';
import { SERVERURL } from '@/common/urls';


export async function GET(request: NextRequest, context: { params: Promise<{ problem_id: string }> }) {
    try {
        const { problem_id } = await context.params;
        const res = await fetch(`${SERVERURL}api/atcoder/${problem_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        const data = await res.json();

        return NextResponse.json({
            status: 200,
            url: data.url
        });
    } catch (error) {
        console.error('Error fetching data:', error);

        const statusCode = error instanceof TypeError ? 503 : 500;
        const errorMessage = error instanceof Error ? error.message : 'Internal Server Error';

        return NextResponse.json({
            status: statusCode,
            error: errorMessage,
        }, {
            status: statusCode
        });
    }
}