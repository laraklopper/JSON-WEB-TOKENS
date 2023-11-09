# JSON WEB TOKENS 

A **JSON Web Token ("JWT")** is a JSON object which is primarily used to securely transfer information between two parties over the web and can be used as an authentication system and can also be used for information exchange. JWT is signed and encoded, not encrypted. 

## AUTHENTICATION
The purpose of using JWT is to ensure the authenticity of the data. At the most basic level, authentication verifies a user’s identity. Authentification with JSW is a way of representing data that does not allow tampering during transit and can be validated using encryption keys. The purpose of authenticating a user is to ensure they only have access to the resources they should.

## STRUCTURE

A JWT is a string that consists of three parts, namely the `header`, `payload`, and `signiture`. Each part is separated by a dot and is base64-encoded. Base64-encoding is a way of representing any kind of data in text format. 

### 1. HEADER

### 2. PAYLOAD

### 3.  SIGNITURE



## REFERENCES

- https://stytch.com/blog/what-is-a-json-web-token/
- https://hackernoon.com/json-web-tokens-jwt-demystified-f7e202249640
- https://www.geeksforgeeks.org/json-web-token-jwt/
- https://stytch.com/blog/authentication-vs-authorization/
- https://dev.to/kcdchennai/how-jwt-json-web-token-authentication-works-21e7 
