const express = require('express');// Import express for creating API's endpoints
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');// Import jwt for API's endpoints authentication
const app = express();// Create an Express application
const port = 8000;//Port that the server will listen on

app.use(bodyParser.json());// Add middleware to parse JSON requests

//User database
let data = [
    {
        name: 'Mazvita',
    },
    {
        name: 'Meagan'
    },
    {
        name: "Kabelo"
    }
]


app.post('/login', (req, res) => {
    // const auth = req.headers['authorization']
    // const token = auth

    if (data.name) {
        payload = {
            name: data.name,
            admin: false
        }
        const token = jwt.sign(JSON.stringify(payload), 'jwt-secret',
            { algorithm: 'HS256' })
        res.send({ 'token': token })
    }
    else {
        res.status(403).send({ 'err': 'incorrect login!' })
    }
})

app.get('/a', (req, res) => {
    // Check if at least one element in the 'data' array has the name 'Mazvita' or 'Meagan'
    if (data.some(item => item.name === 'Mazvita' || item.name === 'Meagan')) {
        // If the condition is true, create a payload object for the JWT token
        let payload = {
            name: data.name, // Note: This should be item.name to refer to the specific element in the 'data' array
            admin: true
        };

        // Sign the payload to generate a JWT token using the 'jwt-secret' key and HS256 algorithm
        const token = jwt.sign(JSON.stringify(payload), 'jwt-secret', { algorithm: 'HS256' });

        // Send the JWT token as a response
        res.send({ 'token': token });
    } else {
        // If none of the elements in 'data' have the name 'Mazvita' or 'Meagan', send a 403 Forbidden status
        // and a JSON response with an error message indicating access is denied
        res.status(403).json({ error: 'Access denied' });
    }
});


app.get('/b', (req, res) => {
        // Check if at least one element in the 'data' array has the name 'Kabelo' or 'Meagan'
    if (data.some(item => item.name === 'Meagan' || item.name === 'Kabelo')) {
        // If the condition is true, create a payload object for the JWT token
        let payload = {
            name: data.name,
            admin: true
        };
                // Sign the payload to generate a JWT token using the 'jwt-secret' key and HS256 algorithm
        const token = jwt.sign(JSON.stringify(payload), 'jwt-secret',  { algorithm: 'HS256' });
        // Send the JWT token as a response
        res.send({ 'token': token });
    } 
    else {
            // If none of the elements in 'data' have the name 'Meagan' or 'Kabelo', send a 403 Forbidden status
        // and a JSON response with an error message indicating access is denied
        res.status(403).json({ error: 'Access denied' });
    }
});

app.get('/c', (req, res) => {
            // Check if at least one element in the 'data' array has the name 'Kabelo'
    if (data.some(item => item.name === 'Kabelo')) {
        // If the condition is true, create a payload object for the JWT token
        let payload = {
            name: data.name,
            admin: true
        };
        const token = jwt.sign(JSON.stringify(payload), 'jwt-secret', 
        { algorithm: 'HS256' });
                // Send the JWT token as a response
        res.send({ 'token': token });
    } else {
        // If none of the elements in 'data' have the name  'Kabelo', send a 403 Forbidden status
        // and a JSON response with an error message indicating access is denied
        res.status(403).json({ error: 'Access denied' });
    }
});

//==================START THE SERVER===================
// Start the server and listen on the specified port
app.listen(port, () =>
    console.log(`Now listening at http://localhost:${port}`);// Log a message indicating that the server is running on the specified port.
)

