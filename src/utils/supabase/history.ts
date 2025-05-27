import { createClient as supabase } from "./client"
export async function saveHistory(){
    const { error } = await supabase()
        .from("history")
        .insert({
            user_id:"123123",
            items:{
                name:"asd",
                ddata:"asda",
            },
            total:20,
        })
    if (error) throw error
}
export async function getHistory(){
    const {data,error}  = await supabase()
        .from("history")
        .select("")
        .order("created_at",{ascending:false})
    if(error) throw error
    return data
}