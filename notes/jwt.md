# JSON WEB TOKENS ('JWT')

JSON WEB TOKENS ('JWT') is a way of representing data that does not allow tampering during transit, & can be validated using encryption keys. When a server recieves a JWT it has a surefire way of determining whether data is legitimate. JSW  is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs are commonly used for authentication and authorization in web development. A JWT is the most common way to identify an authenticated user.

## STRUCTURE

JWTs consist of three parts: a header, a payload, and a signature. These parts are concatenated using dots (`.`) and result in a string in the format `header.payload.signature`. The header typically consists of metadata like the type of the token and the signing algorithm, the payload contains claims, and the signature is used to verify that the sender of the JWT is who it says it is and to ensure that the message wasn't changed along the way.

A JWT includes three parts: the `header`, the `payload`, & the `signiture`. Each part is separated by a dot and is a `Base64URL encoded string.` The final format is has the following output: `header.payload.signiture`

### HEADER

The header contains two parts:
1. the token type (in this case the JWT token)
2. the signing algorithm

**THE HEADER BEFOR BASE64-ENCODING**
```
{
"alg": "HS256",
"typ": "JWT"
}
```
**AFTER**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
```
### PAYLOAD

The payload is the part of the JWT where all the user data is actually added. This data is also referred to as claims. Claims are statements about an entity (typically, the user) and additional data. The payload consists of one of three claims:

- Registered claims
- Public claims
- Private claims

This information is readable by anyone so it is always advised to not put any confidential information in here. This part generally contains user information. This information is present as a JSON object then this JSON object is encoded to BASE64URL.
**THE PAYLOAD BEFORE BASE64-ENCODING**
```
{
"id": 1234,
"name": "John Doe",
"admin": true
}
```
**AFTER**
```
eyJpZCI6MTIzNCwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9
```
### SIGNITURE

The signiture is produced using the algorithm specified in the header. For example, HMAC-SHA256 — a complicated name that really just represents a kind of hashing function.The signiture is a the message (the header and the payload) and also a secret key.
The signiture is what makes a JWT secure andensures the integrity of your JWT during transport.

## USAGE

A JWT is usually attatched to a HTTP request via the HTTP authorisation header as the bearer token The JWT must be sent with every request to the backend, which is a tradeoff to consider.The benefit of this approach is that it provides a stateless form of authentication since the server does not have to remember the user info in session-storage, significantly reducing the amount of work required to the state on the back-end.
### USAGE CASES

#### JWTs are used in various scenarios, including:
##### **Authentication:** 
To securely transmit information about an authenticated user.

##### **Authorization:** 
To specify what actions a user is allowed to perform. This is the most common scenario for using JWT. Once the useris logged in, each subsequent request will include the JWT, allowing the user to access routes, services, & resources that are permitted with that token.

##### **Information Exchange:** 
To securely transmit information between parties. Because JWTs can be signed signed—forexample, using public/private key pairs it can possibly be guaranteed that the sender is who he/she says they are. In addition, since the signiture is calculated using the header & the payload.

# REFERENCES

- https://hackernoon.com/json-web-tokens-jwt-demystified-f7e202249640
- https://stytch.com/blog/what-is-a-json-web-token/
- https://jwt.io/introduction
- https://www.geeksforgeeks.org/json-web-token-jwt/
