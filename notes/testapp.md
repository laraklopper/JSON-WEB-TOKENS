# TEST APP

## SETUP
### CREATE-APP
```
mkdir dummy-app
cd dummy-app
npm init
npm install express
npm i jsonwebtoken
npm i body-parser
npm i nodemon
```

## DEPENDENCIES
```
npm i express
npm i jsonwebtoken
npm i body-parser
npm i nodemon
npm i dotenv
```
## JAVASCRIPT
```
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.json({
        route: '/',
        authentication:false
    })
})

app.listen(port, () =>
    console.log(`Now listening at http://localhost:${port}`)
)
```
## DATA

```
let data = [
    {
        name: 'Adre',
        password: "BJJ",
    },
    {
        name: 'Dylan',        
        password: 'cricket'
    },
    {
        name: 'Ockert',
        password: 'surfing'
    },
    {
        name: 'Lara',
        password: 'hiking'
    }
]
```
