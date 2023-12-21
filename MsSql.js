const sql = require('mssql')

export async function buscar(){
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect({
            server: '192.168.1.2',
            port: 1433,
            database: 'emedsql',
            user: 'importa',
            password: 'QKnjpZN9Bu3LkPTeDcJW6A',
            options: {
              encrypt: false  // Desativar a criptografia
            }
          });
          
        const result = await sql.query`select top 1 * from ProntuarioHistoria ph `
        console.log(result)
    } catch (err) {
        console.log(err)
        // ... error checks
    }
}
buscar();