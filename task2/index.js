const express = require('express');// Import Express Web framework for handling HTTP requests
const jwt = require('jsonwebtoken');// JSON Web Token library
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const app = express();// Create an Express application
const port = 8000;// Define the port for the server to listen on

//==========Middleware setup================
app.use(bodyParser.json());//Middleware to parse JSON requests

// Data containing user information
let dataBase = [
    {
        name: 'Mazvita',//User
        password: 'abc',//Password
        access: '/a',//Access route

    },
    {
        name: 'Meagan',//User
        password: 'edf',//Password
        access: ["/a","/b" ]//Access routes
    },
    {
        name: "Kabelo",//User
        password: 'ghi',//Password
        access: ['/b', '/c']//Access routes
    }
]

//================HANDLE POST REQUESTS TO THE '/login' ENDPOINT===========
app.post('/login', (req, res) => {
    const name = req.body.name;    // Get the name to the json body data
    const password = req.body.password;    // Get the password to the json body data

    // iterate a loop to the data items in the database
    for(let i = 0 ; i< dataBase.length ; i++){
      //Conditional rendering to check if the name and password matches the item in the database 
        if (dataBase[i].name === name && dataBase[i].password === password) {
            // If there's a match, create a payload for the JWT
            payload = {
                name: dataBase[i].name,
                password: true
            }
            // Generate a JSON Web Token (JWT) using the payload and a secret key, using the HS256 algorithm
                const token = jwt.sign(JSON.stringify(payload), 'jwt-secret',
                    { algorithm: 'HS256' })

                res.send({ 'token': token })//Send a JWT as a response to the client
                break;//Exit the loop once the match is found
        }
    }  
})

// =============PROTECTED ROUTES=====================

// Route accessible to users with the name 'Mazvita' or 'Meagan'
app.get('/a', (req, res) => {
    const auth = req.headers['authorization']// Retrieve the authorization header from the request
    const token = auth// Store the authorization token

    //Conditional rendering to check if the name in the first database entry is 'Mazvita' or the name in the second entry is 'Meagan'
    if (dataBase[0].name === 'Mazita' || dataBase[1].name === 'Meagan') {
        // If the condition is met, create a payload with the user's name and password from the first entry in the database
        payload = {
            name: dataBase[0].name,
            password: dataBase[0].password
        }
        // Generate a JSON Web Token (JWT) using the payload and a secret key, using the HS256 algorithm
        const token = jwt.sign(JSON.stringify(payload), 'jwt-secret',
            { algorithm: 'HS256' })
        res.send({ 'token': token })// Send the JWT as a response to the client
    }
    else {
        // If the condition is not met, return a 403 Forbidden status 
        res.status(403).json({ error: 'access denied' })
    }
})

//Route accessible to users with the name 'Meagan' or 'Kabelo'
app.get('/b', (req, res) => {

    const auth = req.headers['authorization']// Retrieve the authorization header from the request
    const token = auth// Store the authorization token

    // Conditional rendering to check if the name in the second database entry is 'Meagan' or the name in the third entry is 'Kabelo'
    if (dataBase[1].name === 'Meagan' || dataBase.name[2] === 'Kabelo') {
        // If the condition is met, create a payload with the user's name and set password to true
        payload = {
            name: dataBase[1].name,
            password: true
        }
        // Generate a JSON Web Token (JWT) using the payload and a secret key, using the HS256 algorithm

        const token = jwt.sign(JSON.stringify(payload), 'jwt-secret',
            { algorithm: 'HS256' })
        res.send({ 'token': token })// Send the JWT as a response to the client

    }
    else {
        // If access is denied, return an error response
        res.status(403).json({ error: 'access denied' })
    }
})

//Route accessible only to users with the name 'Kabelo'
app.get('/c', (req, res) => {
    const token = req.headers['authorization']// Retrieve the authorization header from the request
    // Conditional rendering to check if the name in the third database entry is 'Kabelo'
    if (dataBase[2].name === 'Kabelo') {
        // If the condition is met, create a payload with the user's name and set admin to true
        payload = {
            name: dataBase.name,
            admin: true
        }
        // Generate a JSON Web Token (JWT) using the payload and a secret key, using the HS256 algorithm
        const token = jwt.sign(JSON.stringify(payload), 'jwt-secret',
            { algorithm: 'HS256' })
        res.send({ 'token': token })// Send the JWT as a response to the client
    }
    else {
        // If the condition is not met, return a 403 Forbidden status with an error message
        res.status(403).json({ error: 'access denied' })
    }
})

//====================START THE SERVER===================
// Start the server and listen on the specified port
app.listen(port, () =>
    console.log(`Now listening at http://localhost:${port}`)//Display a message in the console indicating that the server is running.
)
