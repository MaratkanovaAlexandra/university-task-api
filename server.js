import { createServer } from 'http';
import pkg from 'mssql';

const requestListener = async function (req, res) {
  res.setHeader("Content-Type", "applocation/json");

  const PARAMS = getURLParams(req.url);

  if (PARAMS.path === "")  res.end(JSON.stringify({}));
  let result;
  const sqlConfig = {
    user: "MainServer",
    password: "mainserver123456",
    database: "university-task",
    server: 'localhost',
    options: {
      port: 1433,
    }
  }

  await pkg.connect(sqlConfig);

  const METHOD = req.method;

  switch (METHOD) {
    case "GET" :
      let query = GETQuery(PARAMS);
      result = await pkg.query(query);
      break;

    case "POST" :
      
      break;
  }
  res.end(JSON.stringify(result.recordset));
}

const server = createServer(requestListener);
server.listen(8080);

function getURLParams(url) {
  if (url === "/") return {path: "", params: ""}
  const arrParams = url.split("?");
  const link = arrParams[0] !== undefined ? arrParams[0].split("/").filter(e => e !== ""): "";
  const params = arrParams[1]!== undefined ? arrParams[1].split("&") : "";

  return {path: link, params: params};
}

function GETQuery(PARAMS) {
  if (PARAMS.path[0] == "People") {
    let result = `SELECT * FROM ${PARAMS.path[0]}`;

    if(PARAMS.params.length != 0) {
      const par = PARAMS.params[0].split('=');
      const name = par[1].split("%27")[1].split("%20")
      result += ` WHERE ${par[0]} = '${name[0]} ${name[1]}'`;
    }

    if (/\d/.test(PARAMS.path[1])) result += ` WHERE id = ${PARAMS.path[1]}`; 
    if(PARAMS.path[2] === "Donations") result = `SELECT Fonds.fondName, Donations.amount, Donations.date FROM Donations JOIN Fonds ON Donations.fondId = Fonds.id WHERE Donations.personId = ${PARAMS.path[1]} ORDER BY Donations.date`;
    if(PARAMS.path[2] === "Messeges") result = `SELECT Fonds.fondName, Messeges.messege, Messeges.date FROM Messeges JOIN Fonds ON Messeges.fondId = Fonds.id WHERE Messeges.personId = ${PARAMS.path[1]}  ORDER BY Messeges.date`;
    return result;
  }
  if ( PARAMS.path[0] == "Fonds" ) {
    let result = `SELECT * FROM ${PARAMS.path[0]}`;
    if (/\d/.test(PARAMS.path[1])) result += ` WHERE id = ${PARAMS.path[1]}`;

    if(PARAMS.path[2] === "Donations") result = `SELECT People.name, Donations.amount, Donations.date FROM Donations JOIN People ON Donations.personId = People.id WHERE Donations.fondId = ${PARAMS.path[1]} ORDER BY Donations.date`;
    if(PARAMS.path[2] === "Messeges") result = `SELECT People.name, Messeges.messege, Messeges.date FROM Messeges JOIN People ON Messeges.personId = People.id WHERE Messeges.fondId = ${PARAMS.path[1]} ORDER BY Messeges.date`;

    return result;
  }
  if (PARAMS.path[0] == "Animals" ) {
    let result = `SELECT Animals.name, Animals.commonName, Fonds.fondName FROM Animals JOIN Fonds  ON Animals.fondId = Fonds.id`;
    if (/\d/.test(PARAMS.path[1])) result += ` WHERE Animals.id = ${PARAMS.path[1]}`;
    return result;
  }
  if (PARAMS.path[0] == "Donations" ) {
    let result = `SELECT People.name, People.email, Fonds.fondName, Donations.amount, Donations.date FROM Donations JOIN People ON Donations.personId = People.id JOIN Fonds ON Donations.fondId = Fonds.id`;
    if (/\d/.test(PARAMS.path[1])) result += ` WHERE Donations.id = ${PARAMS.path[1]}`;
    return result + "ORDER BY Donations.date";
  }
  if (PARAMS.path[0] == "Messeges" ) {
    let result = `SELECT People.name, People.email, Fonds.fondName, Messeges.messege, Messeges.date FROM Messeges JOIN People ON Messeges.personId = People.id JOIN Fonds On Messeges.fondId = Fonds.id`;
    if (/\d/.test(PARAMS.path[1])) result += ` WHERE Messeges.id = ${PARAMS.path[1]}`;
    return result + "ORDER BY Messeges.date"
  }
}