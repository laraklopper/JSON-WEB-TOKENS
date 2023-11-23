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
```
## JAVASCRIPT
```
const express = require('express');// Import express for creating API's endpoints
const jwt = require('jsonwebtoken');// Import jwt for API's endpoints authentication


const bodyParser = require('body-parser');
// Creates an Express application, initiate
// express top level function
const app = express();
const port = 8000// A port for serving API's

app.use(bodyParser.json());
```
```
//Fake database
let database = [
    {
        name: 'Zander',
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
```
// A demo get route
app.get('/', (req, res) => {
    res.json({
        route: '/',
        authentication: false
    })
})
```
```
// Allow json data
app.use(express.json());

app.post('/login', (req, res) => {
    // Get the name to the json body data
    const name = req.body.name;

    // Get the password to the json body data
    const password = req.body.password;

    // Make two variable for further use
    let isPresent = false;
    let isPresentIndex = null

    // iterate a loop to the data items and
    // check what data are matched.
    for (let i= 0;  i<database.length; i++) {
        // If data name are matched so check
        // the password are correct or not
        if (database[i].name === name && database[i].password ===password) {
            // If both are correct so make isPresent variable true and store the data index
            isPresent = true;
            isPresentIndex = i;

            break;// Break the loop after matching successfully
        };
        
    }
    // If isPresent is true, then create a token and pass to the response
    if (isPresent) {

        // The jwt.sign method is used to create the token
        const token = jwt.sign(
            database[isPresentIndex],
            'secret'
        )

        //Pass the data or token in response
        res.json({
           login: true,
           token: token,
           data: database[isPresentIndex]
        });
    } 
    else {
        // If isPresent is false return the error
        res.json({
            login: false,
            error: 'please check the name and password.'
        })    
    }
})

//Verify route
app.get("/auth", (req, res) =>{
    // Get token value to the json body
    const token = req.body.token;

    // If the token is present Verify the token using jwt.verify method
    if (token) {
        const decode =jwt.verify(token, "secret");

        //  Return response with decode data
        res.json({
            login:true,
            data: decode,
        })
    } 
    else {
        // Return response with error
        res.json({
            login:false,
            data: "error"
        })
        
    }
})
```

```
// Listen the server
app.listen(port, () =>
    console.log(`Now listening at http://localhost:${port}`)
)
```
## DATA

```
//Fake database
let database = [
    {
        name: 'Zander',
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
## POSTMAN OUTPUT DATA
### GET REQUEST
```
http://localhost:8000/
```
```
{
    "route": "/",
    "authentication": false
}
```
### POST REQUEST
```
http://localhost:8000/login
//body
{
  "name": "Ockert",
  "password": "surfing"
}

```
```
{
    "login": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiT2NrZXJ0IiwicGFzc3dvcmQiOiJzdXJmaW5nIiwiaWF0IjoxNzAwMjA5NTAyfQ.iTQs7gZzlOOT7oP_1CXgTQaLriuOAwKTovXGeAw-2i0",
    "data": {
        "name": "Ockert",
        "password": "surfing"
    }
}
```
## REFERENCES 
- https://www.geeksforgeeks.org/how-to-create-and-verify-jwts-with-node-js/
