import {query } from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest){
    
    const rows = await query('SELECT * FROM history')
    console.log(rows)
    return NextResponse.json({rows:rows})
}

export async function POST(req: NextRequest){
    try{
        const body = await req.json();
        const {user_id, items, total} = body;
        if(!user_id || !Array.isArray(items) || !total){
            return NextResponse.json({error:"Datos faltantes o invalidos"}, {status:400} )        
        }        
        const itemsJSON = JSON.stringify(items);
        const sql = `
            INSERT INTO history (user_id, items, total)
            VALUES (?, ?, ?))
        `
        const result = await query(sql, [user_id, itemsJSON, total])
        return NextResponse.json({
            message: "Historial guardado correctamente",
            insertId: result 
        },{status:201})
    }catch(error){
        console.error("❌ Error al guardar historial:", error);
        return NextResponse.json({ error: 'Error interno del servidor' }, { status: 500 });
    }
    
}