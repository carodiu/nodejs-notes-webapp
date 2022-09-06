import sql from 'mssql';
import config from '../config'

export const dbSettings = {
    user : config.dbUser,
    password : config.dbPassword,
    server : config.dbServer,
    database : config.dbDatabase, 
    //port: config.dbPort, 
    options : {
        encrypt : false,
        trustServerCertificate: true,
       
    }
} 

export async function getConnection(){

    try {
       const pool = await sql.connect(dbSettings);
       return pool;
    } catch (error) {
        console.log(error);
    }    
}

export async function getConnectionTest(){

    try {
       const pool = await sql.connect(dbSettings);
       const result = await pool.request().query("select 1");
       console.log(result);
    } catch (error) {
        console.log(error);
    }    
}

export {sql};
