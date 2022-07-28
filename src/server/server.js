const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const port = 8080;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/login', (req, res) => {
  console.log(req.body);
  res.send({
    token: Date.parse(new Date()),
  });
});

app.listen(port, () => console.log(`API is running on http://localhost:${port}/login`));