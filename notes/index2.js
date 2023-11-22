// Import required modules
const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');

// Create an instance of the Express application
const app = express();

// Set the port for the server to listen on
const port = 8000;

// Use bodyParser middleware to parse JSON requests
app.use(bodyParser.json());

// Sample data representing users and their access rights
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

// Endpoint for user login
app.post('/login', (req, res) => {
    // Extract the authorization header from the request
    const auth = req.headers['authorization'];
    // The token is assumed to be directly provided in the authorization header
    const token = auth;

    // Check if the provided token is valid and corresponds to a user in the data array
    const user = data.find(user => jwt.verify(token, 'jwt-secret').name === user.name);

    if (user) {
        // Use the user object found above to create the payload
        const payload = {
            name: user.name,
            admin: true
        }
        // Generate a new JWT token with the payload
        const token = jwt.sign(payload, 'jwt-secret', { algorithm: 'HS256' });
        // Send the new token in the response
        res.send({ 'token': token });
    } else {
        // If the token is not valid or does not correspond to a user, return an error
        res.status(403).send({ 'err': 'incorrect login!' });
    }
});

// Endpoint for accessing resource '/a'
app.get('/a', (req, res) => {
    // Extract the authorization header from the request
    const auth = req.headers['authorization'];
    // The token is assumed to be directly provided in the authorization header
    const token = auth;

    // Use the token to find the corresponding user in the data array
    const user = data.find(user => jwt.verify(token, 'jwt-secret').name === user.name);

    if (user && (user.name === 'Mazvita' || user.name === 'Meagan')) {
        // If the user is authorized, create a new token with an updated payload
        const payload = {
            name: user.name,
            admin: true
        }
        // Generate a new JWT token with the updated payload
        const token = jwt.sign(payload, 'jwt-secret', { algorithm: 'HS256' });
        // Send the new token in the response
        res.send({ 'token': token });
    } else {
        // If the user is not authorized, return an access denied error
        res.status(403).json({ error: 'access denied' });
    }
});

// Endpoint for accessing resource '/b'
app.get('/b', (req, res) => {
    // Extract the authorization header from the request
    const auth = req.headers['authorization'];
    // The token is assumed to be directly provided in the authorization header
    const token = auth;

    // Use the token to find the corresponding user in the data array
    const user = data.find(user => jwt.verify(token, 'jwt-secret').name === user.name);

    if (user && (user.name === 'Meagan' || user.name === 'Kabelo')) {
        // If the user is authorized, create a new token with an updated payload
        const payload = {
            name: user.name,
            admin: true
        }
        // Generate a new JWT token with the updated payload
        const token = jwt.sign(payload, 'jwt-secret', { algorithm: 'HS256' });
        // Send the new token in the response
        res.send({ 'token': token });
    } else {
        // If the user is not authorized, return an access denied error
        res.status(403).json({ error: 'access denied' });
    }
});

// Endpoint for accessing resource '/c'
app.get('/c', (req, res) => {
    // Extract the authorization header from the request
    const auth = req.headers['authorization'];
    // The token is assumed to be directly provided in the authorization header
    const token = auth;

    // Use the token to find the corresponding user in the data array
    const user = data.find(user => jwt.verify(token, 'jwt-secret').name === user.name);

    if (user && user.name === 'Kabelo') {
        // If the user is authorized, create a new token with an updated payload
        const payload = {
            name: user.name,
            admin: true
        }
        // Generate a new JWT token with the updated payload
        const token = jwt.sign(payload, 'jwt-secret', { algorithm: 'HS256' });
        // Send the new token in the response
        res.send({ 'token': token });
    } else {
        // If the user is not authorized, return an access denied error
        res.status(403).json({ error: 'access denied' });
    }
});

// Start the server and listen on the specified port
app.listen(port, () => console.log(`Now listening at http://localhost:${port}`));
