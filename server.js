var Connection = require('tedious').Connection;  
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
  if (err) console.log(`Error: ${err.message}`);
  else console.log("Connected");  
});

connection.connect();