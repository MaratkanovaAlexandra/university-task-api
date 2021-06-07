var Connection = require('tedious').Connection;  
var Request = require('tedious').Request;
let resp = [];

var config = {  
  server: 'localhost', 
  authentication: {
      type: 'default',
      options: {
          userName: "MainServer",
          password: 'mainserver123456' 
      }
  },
  options: {
    port: 1433,
    database: "university-task"
  }
};  
var connection = new Connection(config);  
connection.on('connect', function(err) {  
  if (err) throw err;

  console.log("Connected");  
  executeStatement();
  console.log(resp)
});

connection.connect();

function executeStatement() {
  const request = new Request('SELECT * FROM Persons', (err) => {
    console.log("Start Request")
    if (err) {
      throw err;
    }
    console.log('DONE!');
    console.log(resp)
    connection.close();
  });

  request.on('row', (columns) => {
    let obj = {};
    columns.forEach((column) => {
      obj[column.metadata.colName] = column.value;
    });
    resp.push(obj);
  });

  connection.execSql(request); 
}