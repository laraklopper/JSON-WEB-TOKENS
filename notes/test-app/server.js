const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

// Middleware setup
app.use(bodyParser.json());

// Data containing user information
let database = [
    {
        name: 'Mazvita',
        password: 'secret',
        access: '/a'
    },
    {
        name: 'Meagan',
        password: 'secret',
        access: ["/a", "/b"]
    },
    {
        name: "Kabelo",
        password: 'secret',
        access: ['/b', '/c']
    }
];

// Login endpoint
app.post('/login', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    // Check if the user exists in the database
    for (let i = 0; i < database.length; i++) {
        if (database[i].name === name && database[i].password === password) {
            // Create a payload for the JWT
            const payload = {
                name: database[i].name,
                password: true
            };
            // Sign the payload and send the token in the response
            const token = jwt.sign(JSON.stringify(payload), 'jwt-secret', { algorithm: 'HS256' });
            res.send({ 'token': token });
            return;
        }
    }

    // If no matching user is found, send an error response
    res.status(401).json({ error: 'Invalid credentials' });
});

// Protected route accessible to users with the name 'Mazvita' or 'Meagan'
app.get('/a', (req, res) => {
    // Retrieve the token from the Authorization header
    const token = req.headers['authorization'];

    // Check if the user associated with the token has access to route /a
    if (token && (database[0].name === 'Mazvita' || database[1].name === 'Meagan')) {
        // Create a payload for the JWT
        const payload = {
            name: database[0].name, // Using the first user's name for simplicity
            password: database[0].password
        };
        // Sign the payload and send the token in the response
        const newToken = jwt.sign(JSON.stringify(payload), 'jwt-secret', { algorithm: 'HS256' });
        res.send({ 'token': newToken });
    } else {
        // If access is denied, return a 403 Forbidden response
        res.status(403).json({ error: 'access denied' });
    }
});

// Protected route accessible to users with the name 'Meagan' or 'Kabelo'
app.get('/b', (req, res) => {
    // Retrieve the token from the Authorization header
    const token = req.headers['authorization'];

    // Check if the user associated with the token has access to route /b
    if (token && (database[1].name === 'Meagan' || database[2].name === 'Kabelo')) {
        // Create a payload for the JWT
        const payload = {
            name: database[1].name, // Using Meagan's name for simplicity
            admin: true
        };
        // Sign the payload and send the token in the response
        const newToken = jwt.sign(JSON.stringify(payload), 'jwt-secret', { algorithm: 'HS256' });
        res.send({ 'token': newToken });
    } else {
        // If access is denied, return a 403 Forbidden response
        res.status(403).json({ error: 'access denied' });
    }
});

// Protected route accessible only to users with the name 'Kabelo'
app.get('/c', (req, res) => {
    // Retrieve the token from the Authorization header
    const token = req.headers['authorization'];

    // Check if the user associated with the token has access to route /c
    if (token && database[2].name === 'Kabelo') {
        // Create a payload for the JWT
        const payload = {
            name: database[2].name, // Using Kabelo's name for simplicity
            admin: true
        };
        // Sign the payload and send the token in the response
        const newToken = jwt.sign(JSON.stringify(payload), 'jwt-secret', { algorithm: 'HS256' });
        res.send({ 'token': newToken });
    } else {
        // If access is denied, return a 403 Forbidden response
        res.status(403).json({ error: 'access denied' });
    }
});

// Start the server and listen on the specified port
app.listen(port, () =>
    console.log(`Now listening at http://localhost:${port}`)
);
