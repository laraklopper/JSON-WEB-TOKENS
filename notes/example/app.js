const express = require('express');// Import Express Web framework for handling HTTP requests
const jwt = require('jsonwebtoken');// JSON Web Token library
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const app = express();// Create an Express application
const port = 8000;// Define the port for the server to listen on

//==========Middleware setup================
app.use(bodyParser.json());

// Data containing user information
let data = [
    {
        name: 'Mazvita',
        password: "secret",
        access: ["a"],
    },
    {
        name: 'Meagan',
        password: 'secret',
        access: ["a", "b"]
    },
    {
        name: "Kabelo",
        password: "secret",
        access: ["b", "c"]
    }
]

//================HANDLE POST REQUESTS TO THE '/login' ENDPOINT===========
app.post('/login', (req, res) => {
    const auth = req.headers['authorization']
    const token = auth

    if (data.name) {
        payload = {
            name: data.name,
            admin: true
        }
        const token = jwt.sign(JSON.stringify(payload), 'jwt-secret',
            { algorithm: 'HS256' })
        res.send({ 'token': token })
    }
    else {
        res.status(403).send({ 'err': 'incorrect login!' })
    }
})

// =============PROTECTED ROUTES=====================
// Route accessible to users with the name 'Mazvita' or 'Meagan'
app.get('/a', (req, res) => {

    const auth = req.headers['authorization']
    const token = auth
    if (data.name === 'Mazita' || data.name === 'Meagan') {
        payload = {
            name: data.name,
            admin: true
        }
        const token = jwt.sign(JSON.stringify(payload), 'jwt-secret',
            { algorithm: 'HS256' })
        res.send({ 'token': token })
    }
    else {
        
        res.status(403).json({ error: 'access denied' })
    }
})

//Route accessible to users with the name 'Meagan' or 'Kabelo'
app.get('/b', (req, res) => {

    const auth = req.headers['authorization']
    const token = auth
    
    if (data.name === 'Meagan' || data.name === 'Kabelo') {
        payload = {
            name: data.name,
            admin: true
        }
        const token = jwt.sign(JSON.stringify(payload), 'jwt-secret',
            { algorithm: 'HS256' })
        res.send({ 'token': token })
    }
    else {
        // If access is denied, return an error response
        res.status(403).json({ error: 'access denied' })
    }
})

//Route accessible only to users with the name 'Kabelo'
app.get('/c', (req, res) => {

    const auth = req.headers['authorization']
    const token = auth
    if (data.name === 'Kabelo') {
        payload = {
            name: data.name,
            admin: true
        }
        const token = jwt.sign(JSON.stringify(payload), 'jwt-secret',
            { algorithm: 'HS256' })
        res.send({ 'token': token })
    }
    else {
        res.status(403).json({ error: 'access denied' })
    }
})

//====================START THE SERVER===================
// Start the server and listen on the specified port
app.listen(port, () =>
    console.log(`Now listening at http://localhost:${port}`)
)
