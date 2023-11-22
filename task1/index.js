const express = require('express');// Import Express Web framework for handling HTTP requests
const bodyParser = require('body-parser');// Middleware to parse request bodies
const jwt = require('jsonwebtoken');// JSON Web Token library
const app = express();// Create an Express application
const port = 8000;//Specify the port number

//==========Middleware setup================
app.use(bodyParser.json());

//================HANDLE POST REQUESTS TO THE '/login' ENDPOINT===========
app.post('/login', (req, res) => {
    const usr = req.body.username
    const psw = req.body.password
    if (usr ==='zama' && psw === 'secret') {
        payload = {
            name: usr,
            admin : true
        }
        const token =jwt.sign(JSON.stringify(payload), 'jwt-secret',
        {algorithm: 'HS256'})
        res.send({'token': token})
    } 
    else {
        res.status(403).send({'err': 'incorrect login!'})
    }
})

//================HANDLE GET REQUESTS TO THE '/resource' ENDPOINT===========
app.get('/resource', (req, res) => {
    const auth = req.headers['authorization']
    const token =auth
    try {
        const decoded = jwt.verify(token, 'jwt-secret');
        res.send({'msg':`Hello, ${decoded.name}! Your JSON web Token has been verified`})
    } catch (error) {
        res.status(401).send({'err': 'Bad JWT!'})
    }
})

//================HANDLE GET REQUESTS TO THE '/admin_resource' ENDPOINT===========

app.get('/admin_resource', (req, res) => {
    const token = req.headers['authorization']
    try {
        const decoded = jwt.verify(token, 'jwt-secret');
        if (decoded.admin) {
            res.send({'mes': 'success'})
        
        }
        else{
            res.status(403).send({ 'mes': 'Your JWT was verified but, you are not an admin' })
        }
    } catch (e) {
        res.sendStatus(401)
    }
})

//====================START THE SERVER===================
// Start the server and listen on the specified port
app.listen(port,() =>{
    console.log(`Now listening at http://localhost:${port}`)
})
