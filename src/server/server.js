const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const processRequest = require('./auth');

const port = 8080;

const app = express();

app.use(
  cors(),
  bodyParser.urlencoded({ extended: false }),
  bodyParser.json(),
);
  
app.post('/auth', (req, res) => {
  console.log('server received: ', req.body);
  let type = req.body.type;

  let r;
  if (type in processRequest) r = processRequest[type](req, res);

});

app.listen(port, () => console.log(`API is running on http://localhost:${port}/auth`));
