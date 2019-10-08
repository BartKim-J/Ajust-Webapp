const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

let dbconfig = require('./config/db-config.json');
let connection = mysql.createConnection(dbconfig);

const app = express();
const port = 3030;

app.use('/', express.static("./public/index.html"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/ajustDB', (req, res) =>{
	connection.query("SELECT * FROM ajuster", (err, rows) => {
		if(err) throw err;

		res.send(rows);
	});
});

const server = app.listen(port, () => {
	console.log('ajust DB listening on port', port);
});