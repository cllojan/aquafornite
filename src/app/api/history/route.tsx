import {query } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest){
    
    const rows = await query('SELECT * FROM history')
    console.log(rows)
    return NextResponse.json({rows:rows})
}

export async function POST(){

}