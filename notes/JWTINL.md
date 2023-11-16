# JWT IRL (IN REAL LIFE)

## CREATE EXPRESS APP
```
mkdir jwt-example
cd jwt-example
npm init
npm install express
```
```
npm install body-parser
npm install nodemon
```
### BASIC APP
`index.js`
```
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 8000

app.use(bodyParser.json());

app.post('/login',(req, res) => {
  const usr = req.body.username
  const pwd = req.body.password
  res.send(`Username: ${usr}\n Password: ${pwd}`)
})

app.listen(port, () =>
  console.log(`Now listening at http://localhost:${port}`)
)
```
Use Postman, and make a `POST` request to `http://localhost:8000/login` with the following body:
```
{
"username": "zama",
"password": "abcdef"
}
```
### CREATE 2 ENDPOINTS:

An authentication endpoint & a resource endpoint. 


#### AUTHENTICATION ENDPOINT
The auth endpoint will do password validation and will respond with a JWT if successful.
Check the username and password, & respond with HTTP 403 if it’s wrong — this is the standard response code for auth failure in RESTful APIs.

Remove the `res.send()` statement from the code and replace it with the following.

```
if (usr==='zama' && pwd==='secret'){
//todo
}
else{
res.status(403).send({'err':'Incorrect login!'})
}
```
The most popular JWT library for node is simply called jsonwebtoken. Install it the usual way & add it to the top of the index.js file.
```
npm i jsonwebtoken
```
```
const jwt = require('jsonwebtoken')
```
Replace the todo comment with the following to generate a proper JWT:
```
payload = {
'name': usr,
'admin': false
}
const token = jwt.sign(JSON.stringify(payload), 'jwt-secret',
{algorithm: 'HS256'})
res.send({'token': token})
```
Change the request body to have the correct password & make the request again. The following token should be returned:
```
{
"token":"eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiemFtYSIsImFkbWluIjpmYWxzZX0.KT
o5xXD2ecZWEaABPny6Y2Z6dM0AxPcdtWAAW_TcKTM"
}
```
#### RESOURCE ENDPOINT
The resource endpoint will respond with an arbitrary resource if the JWT is legit.

```
app.get('/resource', (req, res) => {
const auth = req.headers['authorization']
const token = auth.split(' ')[1]
try {
const decoded = jwt.verify(token, 'jwt-secret')
res.send({'msg':
`Hello, ${decoded.name}! Your JSON Web Token has been verified.`})
}catch (err) {
res.status(401).send({'err': 'Bad JWT!'})
}
})
```
JWTs are usually added to the Authorization header of requests, in the format:
- Authorization: Bearer <token>: This is the REST standard. The first two lines take care of extracting said token. Because of the way Express processes headers, the auth header is accessed with a lowercase “a”, even though the header itself has an uppercase “A”.
- The `jwt.verify()` method verifies a given token using the specified secret key. If it produces an unexpected signature (due to a bad key or tampered token) or if the token is malformed, an error is thrown. The algorithm does not need to be specified because it’s already in the header of the token.
- If verification is successful, the token can be trusted and its payload is decoded & then used to construct a personalised message for the user.
- If the verification fails, an HTTP 401 status is returned. This is the REST standard for bad authorisation.

**In the REST tester(Postman):** make a `GET` request to `http://localhost:8000/resource`, and add the following header to it (as one line):
```
Authorization: Bearer
eyJhbGciOiJIUzI1NiJ9.eyJuYW1lIjoiemFtYSIsImFkbWluIjpmYWxzZX0.KTo5xXD2ecZ
WEaABPny6Y2Z6dM0AxPcdtWAAW_TcKTM
```
If a single character is changed in the token the request fails. This is due to the strictness of the signature algorithm.

### ADMIN RESOURCE
To make use of user permissions. Add an admin resource & verify the user as follows:
```
app.get('/admin_resource', (req, res) => {
  const token = req.headers['authorization'].split(' ')[1]
  try {
    const decoded = jwt.verify(token, 'jwt-secret')
    if (decoded.admin){
        res.send({'msg': 'Success!'})
    }
    else{
      res.status(403).send(
      {'msg': 'Your JWT was verified, but you are not an admin.'})
    }
}
catch (e) {
  res.sendStatus(401)
})
```
Making a request to this endpoint with the previous token will result in an HTTP 403 status because even though the token was verified, the user is not an admin. Attempts to change the payload’s admin-attribute to true directly (using base64 decode and encode) will result in a token verification failure. This is because the signature will be incorrect. The only way to get an admin token is to have the auth endpoint dispense it as such. To see this in action, change the login endpoint to have its payload contain admin: true, and use the resulting token to request to http://localhost:8000/admin_resource.
