# JSON WEB TOKENS 

JSON WEB TOKENS ('JWT') is a way of representing data that does not allow tampering during transit, & can be validated using encryption keys. When a server recieves a JWT it has a surefire way of determining whether data is legitimate. JSW is an open standard (RFC 7519) that defines a compact and self-contained way for securely transmitting information between parties as a JSON object. This information can be verified and trusted because it is digitally signed. JWTs are commonly used for authentication and authorization in web development. A JWT is the most common way to identify an authenticated user.


## AUTHENTICATION
The purpose of using JWT is to ensure the authenticity of the data. At the most basic level, authentication verifies a user’s identity. Authentification with JSW is a way of representing data that does not allow tampering during transit and can be validated using encryption keys. The purpose of authenticating a user is to ensure they only have access to the resources they should.

## STRUCTURE

A JWT is a string that consists of three parts, namely the `header`, `payload`, and `signiture`. Each part is separated by a dot and is base64-encoded. Base64-encoding is a way of representing any kind of data in text format. 

### 1. HEADER

The header is a JSON object describing the token. The header typically consists of two parts: the type of the token, which is JWT, and the signing algorithm being used. 

### 2. PAYLOAD

A payload is a JSON object

### 3.  SIGNITURE



## REFERENCES

- https://stytch.com/blog/what-is-a-json-web-token/
- https://hackernoon.com/json-web-tokens-jwt-demystified-f7e202249640
- https://www.geeksforgeeks.org/json-web-token-jwt/
- https://stytch.com/blog/authentication-vs-authorization/
- https://dev.to/kcdchennai/how-jwt-json-web-token-authentication-works-21e7 
