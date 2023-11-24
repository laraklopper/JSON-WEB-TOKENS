const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

//==========Middleware setup===========

app.use(bodyParser.json());

//=======DATA=============
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
]

app.post('/login', (req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const auth = req.headers['authorization']
    const token = auth

    let isPresent = false;
    let isPresentIndex = null

    for (let i = 0; i < database.length; i++) {
        if (database[i].name === name && database[i]) {
            payload = {
                name: database.name,
                password: true
            }
            const token = jwt.sign(JSON.stringify(payload), 'jwt-secret', 
                                   { algorithm: 'HS256' })
              res.send({ 'token': token })
            break
        }
    }
})

// =============PROTECTED ROUTES=====================

app.get('/a', (req, res) => {
    const token = req.body.token
    const auth = req.headers['authorization']
    
    if (database.name === 'Mazita' || database.name === 'Meagan') {
        payload = {
            name: database.name,
            password: database.password
        }
        const token = jwt.sign(JSON.stringify(payload), 'jwt-secret', 
                               { algorithm: 'HS256' })
        res.send({ 'token': token })
    } 
    else {
        res.status(403).json({ error: 'access denied' })
    }
})

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
    } else {
        res.status(403).json({ error: 'access denied' })
    }
})

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

app.listen(port, () => 
  console.log(`Now listening at http://localhost:${port}`)
          )
