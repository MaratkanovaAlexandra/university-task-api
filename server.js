var Connection = require('tedious').Connection;  
var Request = require('tedious').Request;

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
});

connection.connect();

function executeStatement() {
  const request = new Request('SELECT * FROM Persons', (err) => {
    console.log("Start Request")
    if (err) {
      throw err;
    }

    console.log('DONE!');
    connection.close();
  });

  request.on('row', (columns) => {
    columns.forEach((column) => {
      if (column.value === null) {
        console.log('NULL');
      } else {
        console.log(column.value);
      }
    });
  });

  connection.execSql(request);  
}