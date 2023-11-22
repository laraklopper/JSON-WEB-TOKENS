const express = require('express');// Import Express Web framework for handling HTTP requests
const jwt = require('jsonwebtoken');// JSON Web Token library
const bodyParser = require('body-parser');// Middleware for parsing request bodies
const app = express();// Create an Express application
const port = 8000;// Define the port for the server to listen on

//==========Middleware setup================
// Configuring middleware to parse JSON data
app.use(bodyParser.json());

//======DATA CONTAINING USER INFORMATION============
let data = [
    {
        name: 'Mazvita',
        access: '/a'
    },
    {
        name: 'Meagan',
        access: ["/a", "/b"]
    },
    {
        name: "Kabelo",
        access: ['/b', '/c']
    }
]

//================HANDLE POST REQUESTS TO THE '/login' ENDPOINT===========
// Handling POST requests to the /login endpoint
app.post('/login', (req, res) => {
    // Extracting the token from the request headers
    const auth = req.headers['authorization'];
    const token = auth;

    // Verifying if the provided token corresponds to a user in the data array
    const user = data.find(user => jwt.verify(token, 'jwt-secret').name === user.name);

    if (user) {
        // If the user is found, create a new token with additional payload
        const payload = {
            name: user.name,
            admin: true
        }
        const token = jwt.sign(payload, 'jwt-secret', { algorithm: 'HS256' });
        res.send({ 'token': token });
    } else {
        // If the user is not found, return a 403 Forbidden status with an error message
        res.status(403).send({ 'err': 'incorrect login!' });
    }
});

// ============= PROTECTED ROUTES ======================

// Authorization endpoints for /a, /b, and /c
app.get('/a', (req, res) => {
    // ... (similar structure for /b and /c)
    const auth = req.headers['authorization'];
    const token = auth;

    // Use the token to find the corresponding user in the data array
    const user = data.find(user => jwt.verify(token, 'jwt-secret').name === user.name);

    if (user && (user.name === 'Mazvita' || user.name === 'Meagan')) {
        const payload = {
            name: user.name,
            admin: true
        }
        const token = jwt.sign(payload, 'jwt-secret', { algorithm: 'HS256' });
        res.send({ 'token': token });
    } else {
        res.status(403).json({ error: 'access denied' });
    }
});

// Route accessible to users with the name 'Meagan' or 'Kabelo'
app.get('/b', (req, res) => {
    const auth = req.headers['authorization'];
    const token = auth;

    const user = data.find(user => jwt.verify(token, 'jwt-secret').name === user.name);

    if (user && (user.name === 'Meagan' || user.name === 'Kabelo')) {
        const payload = {
            name: user.name,
            admin: true
        }
        const token = jwt.sign(payload, 'jwt-secret', { algorithm: 'HS256' });
        res.send({ 'token': token });
    } else {
        res.status(403).json({ error: 'access denied' });
    }
});

app.get('/c', (req, res) => {
    const auth = req.headers['authorization'];
    const token = auth;

    const user = data.find(user => jwt.verify(token, 'jwt-secret').name === user.name);

    if (user && user.name === 'Kabelo') {
        const payload = {
            name: user.name,
            admin: true
        }
        const token = jwt.sign(payload, 'jwt-secret', { algorithm: 'HS256' });
        res.send({ 'token': token });
    } else {
        res.status(403).json({ error: 'access denied' });
    }
});

===================START THE SERVER===================
// Start the server and listen on the specified port
app.listen(port, () => console.log(`Now listening at http://localhost:${port}`));
