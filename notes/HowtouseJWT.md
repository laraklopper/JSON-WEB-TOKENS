# HOW TO USE JSON WEB TOKENS

## **CREATE THE APP**
```
mkdir app-name
cd app-name
npm init
```

### 1. Install `jsonwebtoken`:

```bash
npm install jsonwebtoken
```

### 2. Set Up Express:

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

### 3. Create JWTs:

In the authentication route, create and sign a JWT when a user successfully logs in. This typically includes user information in the payload.

```javascript
const jwt = require('jsonwebtoken');

app.post('/login', (req, res) => {
  // Validate user credentials (this is just an example, use your own authentication logic)
  const { username, password } = req.body;

  // If credentials are valid, create a JWT
  if (username === 'example' && password === 'password') {
    const payload = { username };
    const secretKey = 'your-secret-key'; // Replace with a strong, random secret key
    const options = { expiresIn: '1h' }; // Token expiration time

    const token = jwt.sign(payload, secretKey, options);
    res.json({ token });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});
```

### 4. Verify JWTs:

In your protected routes, verify the incoming JWT to authenticate the user.

```javascript
app.get('/protected-route', (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'Token is missing' });
  }

  const secretKey = 'your-secret-key';

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // The token is valid, you can now use the decoded information (e.g., user data)
    const { username } = decoded;
    res.json({ message: `Welcome, ${username}! This is a protected route.` });
  });
});
```
