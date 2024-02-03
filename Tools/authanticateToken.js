const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Access denied. No token provided.' });

  jwt.verify(token, 'Mojave123', (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token.' });

    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
