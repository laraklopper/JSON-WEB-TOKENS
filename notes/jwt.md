# JSON WEB TOKENS 

JSON WEB TOKENS ('JWT') is a way of representing data that does not allow tampering during transit, & can be validated using encryption keys. When a server recieves a JWT it has a surefire way of determining whether data is legitimate.

## STRUCTURE

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

### SIGNITURE


