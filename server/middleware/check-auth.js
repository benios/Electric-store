const jwt = require('jsonwebtoken');

function authRole(role) {
  return (req, res, next) => {
    if (req.userData.role === role || req.userData.role === 'Admin') {
      return next();
    }
    res.status(401);
    return res.send('Not allowed');
  };
}

function authUser(req, res, next) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.userData = decoded;
    return next();
  } catch (err) {
    return res.status(500).json({
      message: 'Auth failed',
    });
  }
}

module.exports = {
  authRole,
  authUser,
};
