const express = require('express');
const bodyParser = require('body-parser');
const sql = require('./sequelize/dbConnection.js');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 4000;
sql.Conn();
app.post('/api/createEmail', async (req, res) => {
  let userEmail = req.body.email;
  let userPassword = req.body.password;
  let findName = await sql.FindByName(userEmail);
  if (findName == 'exitsiting') {
    res.send(findName);
  } else {
    let ppl = await sql.Create(userEmail, userPassword);
    res.send('created');
  }
});
app.get('/api/emails', async (req, res) => {
  let emails = await sql.FindAll();

  res.send(emails);
});
app.post('/api/login', async (req, res) => {
  let userName = req.body.email;
  let userPassword = req.body.password;

  let statusCode = await sql.ValidUser(userName, userPassword);
  res.status(statusCode).send(statusCode);
});
app.post('/api/searchEmailId', async (req, res) => {
  let userName = req.body.email;
  let statusCode = await sql.FindByName(userName);
  res.send(statusCode);
});

app.listen(port, () => {
  console.log('listening on port ' + port);
});
