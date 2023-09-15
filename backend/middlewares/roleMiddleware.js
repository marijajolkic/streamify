// roleMiddleware.js
require('dotenv').config();
const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

const verifyRole = (roles) => {
  return async (req, res, next) => {
    try {
      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userRoles = await userModel.getUserRolesByUserId(decoded.id);
      if (!roles.some(role => userRoles.includes(role))) {
        return res.status(403).json({ error: 'Forbidden' });
      }
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
};

module.exports = {
  verifyRole,
};
