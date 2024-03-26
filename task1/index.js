const express = require('express');// Import Express Web framework for handling HTTP requests
const bodyParser = require('body-parser');// Middleware to parse request bodies
const jwt = require('jsonwebtoken');// JSON Web Token library
const app = express();// Create an Express application
const port = 8000;//Specify the port number

//==========Middleware setup================
app.use(bodyParser.json());//Use bodyParser to parse JSON request bodies

//================HANDLE POST REQUESTS TO THE '/login' ENDPOINT===========
app.post('/login', (req, res) => {
    // Extract username and password from the request body
    const usr = req.body.username
    const psw = req.body.password
    //Conditional rendering to check if the provided username and password match the values
    if (usr ==='zama' && psw === 'secret') {
        /* If the provided username and password match expected values
        create a payload for the JWT token*/
        payload = {
            name: usr,
            admin : true
        }
        // Sign the payload to create a JWT token using 'jwt-secret' key
        const token = jwt.sign( payload, 'jwt-secret', 
             {
            algorithm: 'HS256'//algorithm
        });
        // Send the generated token as response
        res.send({ 'token': token })        
    } 
    else {
        //If the username and/or password is incorrect, send a 403 forbidden status response
        res.status(403).send({'err': 'incorrect login!'})
        // console.error('Incorrect login');//Log an error message in the console for debugging purposes
    }
})


//================HANDLE GET REQUESTS TO THE '/resource' ENDPOINT===========
// Endpoint to access a protected resource
app.get('/resource', (req, res) => {
    const authHeader = req.headers['authorization'];// Extract the Authorization header
    const token = authHeader;// Extract JWT token from Authorization header
   
    try {
        // Verify the JWT token using the 'jwt-secret' key
        const decoded = jwt.verify(token, 'jwt-secret');// Decode the token using the secret key 'jwt-secret'
        // If the verification is successful, 'decoded' will contain the decoded token payload
        // Extract the JWT token part from the Authorization header
        res.send({ 'msg': `Hello, ${decoded.name}! Your JSON web Token has been verified` })
    } 
    catch (error) {
        console.error(error);//Log an error messag in the console for debugging purposes
        res.status(401).send({ 'err': 'Bad JWT!' })// Send an error response
    }
})

//================HANDLE GET REQUESTS TO THE '/admin_resource' ENDPOINT===========
// Endpoint to access an admin resource
app.get('/admin_resource', (req, res) => {
    //Extract the authorisation header from the request
    const token = req.headers['authorization'];
    try {
        const decoded = jwt.verify(token, 'jwt-secret'); //Verify the JWT and extract the 
        //Conditional rendering to check if the user is an admin
        if (decoded.admin) {
            res.send({ 'mes': 'success' });// If user is admin, send success response
            // console.log('Success'); //Display a success message in the console for debugging purposes
        }
        else {
            // If the user is not an admin, send a 403 Forbidden status response
            res.status(403).send({ 'mes': 'Your JWT was verified but, you are not an admin' })
        }
    } catch (e) {
        
        // console.error('Unauthorised');//Log an error messag in the console for debugging purposes
        res.sendStatus(401);// If JWT verification fails, send a 401 Unauthorized status response
    }
})


//====================START THE SERVER===================
// Start the server and listen on the specified port
app.listen(port,() =>{
    //Log message in the console indicating that the server is running on the port
    console.log(`Now listening at http://localhost:${port}`);
})