const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const port = 8000

app.use(bodyParser.json());

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
        res.status(403).json({ error: 'access denied' })
    }
})


app.listen(port, () =>
    console.log(`Now listening at http://localhost:${port}`)
)
