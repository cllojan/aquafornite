import mysql from "mysql2"

export async function query(query:string){
    const connection = mysql.createConnection({
        host:'mx130.hostgator.mx',        
        user:'jeussval_admin',
        password:'Admin@234',        
        database: 'jeussval_aquadb', 
    })
    try{    
        const results = await connection.execute(query);
        console.log("Conexion exitosa");
        connection.end();
        return results
    }catch(error){
        console.error("Error ", error);
        return {error};
    }
}
