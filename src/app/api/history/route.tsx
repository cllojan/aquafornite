import {query } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest){
    let test:string[] = [""]
    const rows = await query('select * from `history`')
    return NextResponse.json({rows:rows})
}

export async function POST(){

}