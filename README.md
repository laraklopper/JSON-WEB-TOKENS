# JSON-WEB-TOKENS

**JSON WEB TOKENS('JWT')**

1. [USING JWT](#using-jwt)
2. [HOW TO USE JWT](#how-to-use-jwt)

## USING JWT

Using JWT with Express in JavaScript involves several steps: creating and verifying tokens, middleware integration, and handling authentication in your routes. 

## HOW TO USE JWT
Setup an Express app
```
mkdir app-name
cd app-name
npm init
npm i express
```

1. **Install Dependencies:**

    ```bash
    npm install express jsonwebtoken
    ```

2. **Setup Express and JWT:**

    ```javascript
    const express = require('express');
    const jwt = require('jsonwebtoken');
    const bodyParser = require('body-parser');

    const app = express();
    const PORT = 3000;
    const secretKey = 'yourSecretKey'; // Replace with your own secret key

    app.use(bodyParser.json());

    // Dummy user for demonstration purposes
    const dummyUser = {
      id: 1,
      username: 'demoUser',
      password: 'password123',
    };

    // Middleware to check for a valid token
    const authenticateToken = (req, res, next) => {
      const token = req.headers['authorization'];

      if (!token) return res.sendStatus(401); // Unauthorized

      jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.sendStatus(403); // Forbidden
        req.user = user;
        next();
      });
    };

    // Route to generate a JWT
    app.post('/login', (req, res) => {
      // In a real scenario, you would validate the user's credentials here
      if (req.body.username === dummyUser.username && req.body.password === dummyUser.password) {
        const token = jwt.sign({ username: dummyUser.username, id: dummyUser.id }, secretKey);
        res.json({ token });
      } else {
        res.sendStatus(401); // Unauthorized
      }
    });

    // Protected route that requires a valid token
    app.get('/protected', authenticateToken, (req, res) => {
      res.json({ message: 'This is a protected route!', user: req.user });
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    ```

3. **Usage:**

    - Start your server (`node yourfile.js`).
    - Use a tool like Postman or curl to test the endpoints.

    **Example Flow:**
    
    - Use a POST request to `/login` with the dummy user credentials.
    - Receive a token in the response.
    - Include this token in the headers of subsequent requests to the `/protected` route.
    - The server verifies the token using the middleware (`authenticateToken`) before processing the request.
