const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const port = 8000;

// Middleware setup for parsing JSON bodies
app.use(express.json());

// Data containing user information
let data = [
    {
        name: 'Mazvita',
        access: '/a'
    },
    {
        name: 'Meagan',
        access: ['/a', '/b']
    },
    {
        name: "Kabelo",
        access: ['/b', '/c']
    }
]

// HANDLE POST REQUESTS TO THE '/login' ENDPOINT
app.post('/login', (req, res) => {
    const auth = req.headers['authorization'];
    const token = auth.split(' ')[1];

    const user = data.find(item => item.name === req.body.name);

    if (user) {
        payload = {
            name: user.name,
            admin: true
        }
        const newToken = jwt.sign(payload, 'jwt-secret', { algorithm: 'HS256' });
        res.send({ 'token': newToken });
    } else {
        res.status(403).send({ 'err': 'incorrect login!' });
    }
});

// PROTECTED ROUTES
const verifyToken = (req, res, next) => {
    const auth = req.headers['authorization'];
    if (!auth) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    const token = auth.split(' ')[1];

    jwt.verify(token, 'jwt-secret', (err, decoded) => {
        if (err) {
            console.error('Token verification error:', err.message);
            return res.sendStatus(401);
        }
        req.user = decoded;
        next();
    });
};

app.get('/a', verifyToken, (req, res) => {
    const user = data.find(item => item.name === req.user.name);
    if (user && user.access.includes('/a')) {
        res.send({ 'msg': 'success' });
    } else {
        res.status(403).json({ error: 'access denied' });
    }
});

app.get('/b', verifyToken, (req, res) => {
    const user = data.find(item => item.name === req.user.name);
    if (user && user.access.includes('/b')) {
        res.send({ 'msg': 'success' });
    } else {
        res.status(403).json({ error: 'access denied' });
    }
});

app.get('/c', verifyToken, (req, res) => {
    const user = data.find(item => item.name === req.user.name);
    if (user && user.access.includes('/c')) {
        res.send({ 'msg': 'success' });
    } else {
        res.status(403).json({ error: 'access denied' });
    }
});

// START THE SERVER
app.listen(port, () =>
    console.log(`Now listening at http://localhost:${port}`)
);
