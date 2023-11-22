const express = require('express');
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;

app.use(bodyParser.json());

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

app.post('/login', (req, res) => {
    const auth = req.headers['authorization'];
    const token = auth;

    // Fix: Check if the provided token is valid and corresponds to a user in the data array
    const user = data.find(user => jwt.verify(token, 'jwt-secret').name === user.name);

    if (user) {
        // Fix: Use the user object found above to create the payload
        const payload = {
            name: user.name,
            admin: true
        }
        const token = jwt.sign(payload, 'jwt-secret', { algorithm: 'HS256' });
        res.send({ 'token': token });
    } else {
        res.status(403).send({ 'err': 'incorrect login!' });
    }
});

app.get('/a', (req, res) => {
    const auth = req.headers['authorization'];
    const token = auth;

    // Fix: Use the token to find the corresponding user in the data array
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

app.listen(port, () => console.log(`Now listening at http://localhost:${port}`));
