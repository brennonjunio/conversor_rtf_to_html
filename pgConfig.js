const pg = require('pg');
const credentials = {
    host: String('192.168.1.254'),
    database: String('dbprod'),
    user: String('postgres'),
    password: String('postgres'),
    port: Number(5432),
};
async function executaSql(sql, params) {
    try {
        const client = new pg.Pool(credentials);
        const result = await client.query(sql, params);
        await client.end();
        return result;
    } catch (error) {
        console.error('err in executaSql >>> ', error.message);
        return error.message;
    }
}
module.exports = { executaSql };
