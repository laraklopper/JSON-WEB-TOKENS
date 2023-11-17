const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000

app.use(bodyParser.json());

let data = [
    {
        name: 'Mazvita',
        route: '/a'
    },
    {
        name: 'Meagan'
    },
    {
        name: "Kabelo"
    }
]


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

app.get('/resource', (req, res) => {
    const auth = req.headers['authorization']
    const token = auth
    try {
        const decoded = jwt.verify(token, 'jwt-secret');
        res.send({ 'msg': `Hello, ${decoded.name}! Your JSON web Token has been verified` })
    } catch (error) {
        res.status(401).send({ 'err': 'Bad JWT!' })
    }
})

app.get('/admin_resource', (req, res) => {
    const token = req.headers['authorization']
    try {
        const decoded = jwt.verify(token, 'jwt-secret');
        if (decoded.admin) {
            res.send({ 'mes': 'success' })

        }
        else {
            res.status(403).send({ 'mes': 'Your JWT was verified but, you are not an admin' })
        }
    } catch (e) {
        res.sendStatus(401)
    }
})

app.listen(port, () =>
  console.log(`Now listening at http://localhost:${port}`)
)

