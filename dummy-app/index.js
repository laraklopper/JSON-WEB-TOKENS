const express = require('express');// Import express for creating API's endpoints
const jwt = require('jsonwebtoken');// Import jwt for API's endpoints authentication
const bodyParser = require('body-parser');

// Creating an instance of Express
const app = express();
const port = 8000;


app.use(bodyParser.json());// Adding middleware to parse JSON requests

// Mock database with user credentials
// let database = [
//     { name: 'Dylan', password: 'hashedPassword1' },
//     { name: 'Ockert', password: 'hashedPassword2' },
//     { name: 'Ricky', password: 'hashedPassword3' }
// ];

let database = [
    {
        name: 'Dylan',
        password: 'cricket'
    },
    {
        name: 'Ockert',
        password: 'surfing'
    },
    {
        name: 'Ricky',
        password: 'running'
    }
]

// Define a route for handling GET requests to the root endpoint ('/')
app.get('/', (req, res) => {
    // Respond with a JSON object containing information about the route and authentication status
    res.json({
        route: '/', // Specify the route in the response
        authentication: false // Set authentication status to false by default
    });
});


// Route for user login
app.post('/login', (req, res) => {
    // Extracting username and password from the request body
    const name = req.body.name;    // Extract the name to the json body data
    const password = req.body.password; //Extract the password from the json body data

    // Variables to check if the user is present in the database
    let isPresent = false;
    let isPresentIndex = null;

    // Looping through the database to find the user
    for (let i = 0; i < database.length; i++) {
        if (database[i].name === name && database[i].password === password) {
            isPresent = true;
            isPresentIndex = i;
            break;
        }
    }

// Conditional rendering to check if the user is present in the database
if (isPresent) {
    // If present, create a JWT token using the jwt.sign method
    const token = jwt.sign({ name: database[isPresentIndex].name }, 'yourSecretKey');

    // Respond with a JSON object indicating successful login
    res.json({
        login: true,
        token: token, // Include the generated token in the response
        data: database[isPresentIndex] // Include user data in the response
    });
} 
else {
    // If the user is not present in the database or credentials are incorrect
    res.json({
        login: false,
        error: 'Invalid credentials.' // Provide an error message in the response
    });
}
});

// Route for checking user authentication using the provided token
app.get("/auth", (req, res) => {
    // Extracting the token from the request headers
    const token = req.headers.authorization;

    // If token is present, verify it using the secret key
    if (token) {
        try {
            const decode = jwt.verify(token, 'yourSecretKey');
            // If verification is successful, send user data in the response
            res.json({
                login: true,
                data: decode,
            });
        } catch (error) {
            // If verification fails, send an error message
            res.json({
                login: false,
                error: 'Invalid token.'
            });
        }
    } else {
        // If token is not provided, send an error message
        res.json({
            login: false,
            error: 'Token not provided.'
        });
    }
});



// Start the server and listen on the specified port
app.listen(port, () =>
    console.log(`Now listening at http://localhost:${port}`)
);
