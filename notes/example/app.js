const express = require('express');// Import Express Web framework for handling HTTP requests
const jwt = require('jsonwebtoken');// JSON Web Token library
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const app = express();// Create an Express application
const port = 8000;// Define the port for the server to listen on

//==========Middleware setup================
app.use(bodyParser.json);//bodyParser for parsing request bodies

// Data containing user information
let userDataBase = [
    {
        username: 'Mazvita',
        password: "secret",
        access: ["a"],
    },
    {
        username: 'Meagan',
        password: 'secret',
        access: ["a", "b"]
    },
    {
        username: "Kabelo",
        password: "secret",
        access: ["b", "c"]
    }
]

//===============LOGIN ROUTE=================
// Handles user authentication and generates JWT token

app.post('/login',(req, res) => {
    // Extract username and password from the request body
    const userLogin = req.body.username
    const psw = req.body.password

    // Find the index of the user in the database
    const userIndex = userDataBase.findIndex(index => index.username === userLogin);

    // Conditional rendering to check if the user exists and the password matches
    if (userIndex > -1 && psw === userDataBase[userIndex].password) {
        // If authentication is successful, create a payload for the JWT token
        let payload = {
            'name': userLogin,
            'access': userDataBase[userIndex].access
        }
        // Sign the payload to generate the JWT token
        const token = jwt.sign(JSON.stringify(payload), 'jwt-secret', {
            algorithm: 'HS256'//algorithm for signing the token
        })
        // Send the generated token as a response
        res.send({
            'token': token
        })
    } 
    else {
        // If authentication fails (user not found or incorrect password), send a 403 Forbidden status
        res.status(403).send(
            { 'err': 'incorrect login!' }
        )
    }
})

//===============PROTECTED ROUTES=================

// Route accessible to users with access 'a'
app.get('/a', (req, res) => {
    // Extract the JWT token from the Authorization header
    const token = req.headers['authorization'].split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'jwt.secret');
        //The jwt.verify() is used verify the authenticity of the JWT token. 
        //It checks the signature and expiration of the token using the secret key ('jwt.secret').

        const accessIndex = decoded.access.indexOf('a');

        if(accessIndex > -1){
            res.send(
                { 'msg': 'success' }
            )
        }
        else { 
            res.status(403).json({ error: 'access denied' }) 
            //If the access index is -1 (meaning 'a' is not present), send a 403 Forbidden status with an error message indicating access denial.
             }

    } catch (error) {
        // If token verification fails, a 401 status code (Unauthorized) is returned
        //401 Unauthorized response status code indicates that the client request has not been completed because it lacks valid authentication credentials for the requested resource.
        res.sendStatus(401)
    }

});
//Route accessible to users with the name 'Meagan' or 'Kabelo'
app.get('/b', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'jwt.secret');

        const accessIndex = decoded.access.indexOf('b');

        if (accessIndex > -1) {
            res.send(
                { 'msg': 'success' }
            )
        }
        else { res.status(403).json({ error: 'access denied' }) }

    } catch (error) {
                // If token verification fails, a 401 status code (Unauthorized) is returned
        res.sendStatus(401)
    }

});

//Route accessible only to users with the name 'Kabelo'
app.get('/c', (req, res) => {
    const token = req.headers['authorization'].split(' ')[1]
    try {
        const decoded = jwt.verify(token, 'jwt.secret');

        const accessIndex = decoded.access.indexOf('c');

        if (accessIndex > -1) {
            res.send(
                { 'msg': 'success' }
            )
        }
        else { 
            res.status(403).json({ error: 'access denied' })
            //If the access index is -1 (meaning 'a' is not present), send a 403 Forbidden status with an error message indicating access denial.
             }

    } catch (error) {
                        // If token verification fails, a 401 status code (Unauthorized) is returned

        res.sendStatus(401)
    }

});


//====================START THE SERVER===================
// Start the server and listen on the specified port
app.listen(port, () =>
    console.log(`Now listening at http://localhost:${port}`)
)
