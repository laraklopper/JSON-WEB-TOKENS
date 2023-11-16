const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000

app.use(bodyParser.json());

app.post('/login',(req, res) => {
  const usr = req.body.username
  const pwd = req.body.password
  res.send(`Username: ${usr}\n Password: ${pwd}`)
})

app.listen(port, () =>
  console.log(`Now listening at http://localhost:${port}`)
)
