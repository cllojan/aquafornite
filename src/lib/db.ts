import mysql from "mysql2/promise"
const connection = mysql.createPool({
    host:'mx130.hostgator.mx',        
    user:'jeussval_admin',
    password:'Admin@234',        
    database: 'jeussval_aquadb', 
    waitForConnections:true,
    connectionLimit:10,
})
export async function query(sql:string, values?:any[]){
   
    try{    
        const [rows] = await connection.execute(sql,values);                
        return rows
    }catch(error){
        console.error("Error ", error);        
        return {error};
    }
    
}
