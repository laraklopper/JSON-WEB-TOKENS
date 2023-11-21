# REQUESTS 

## POST REQUET (/login)

### REQUEST
```
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
```
### RESPONSE
#### 'Mazvita'
```
{
    "err": "incorrect login!"
}
```
Body
```
{
    "name":"Mazita"
}
```
#### Meagan
403 `Forbidden`status code
```
{
    "err": "incorrect login!"
}
```
Body
```
{
    "name":"Meagan"
}
```
#### Kabelo

403 status code
```
{
    "err": "incorrect login!"
}
```
Body
```
{
    "name":"Kabelo"
}
```
## GET REQUEST (/a)
```
http://localhost:8000/a
```
### REQUEST
```
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
```
#### Mazvita
```
{
    "error": "access denied"
}
```
Body
```
{
    "name":"Mazvita"
}
```
#### Meagan
403 `Forbidden`status code
```
{
    "error": "access denied"
}
```
Body
```
{
    "name":"Meagan"
}
```
## GET REQUEST (/b)
```
http://localhost:8000/b
```

### REQUEST
```
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

```
### RESPONSE
#### Meagan
403 `Forbidden`status code

```
{
    "error": "access denied"
}

```
Body
```
{
    "name":"Meagan"
}
```
#### Kabelo
403 `Forbidden`status code

```
{
    "error": "access denied"
}
```
Body
```
{
    "name":"Kabelo"
}
```
## GET REQUEST (/c)
```
http://localhost:8000/c
```
### REQUEST
```
app.get('/c', (req, res) => {

    const auth = req.headers['authorization']
    const token = auth
    if ( data.name === 'Kabelo') {
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
```
### RESPONSE
#### Kabelo
403 `Forbidden`status code
```
{
    "error": "access denied"
}
```
Body
```
{
    "name":"Kabelo"
}
```
