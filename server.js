import pkg from 'mssql';

const sqlConfig = {
  user: "MainServer",
  password: "mainserver123456",
  database: "university-task",
  server: 'localhost',
  options: {
    port: 1433,
  }
}

await pkg.connect(sqlConfig)
const result = await pkg.query`select * from Messeges`;
console.log(result.recordset)