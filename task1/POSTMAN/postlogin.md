# POST REQUEST (login endpoint)
```
http://localhost:8000/login
```

## REQUEST CODE

```
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
```

## RESPONSE

403 STATUS `(Forbidden response)`
```
{
    "err": "incorrect login!"
}
```
