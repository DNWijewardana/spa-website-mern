import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Verify JWT from httpOnly cookie or Authorization header
export const protect = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token ||
      (req.headers.authorization?.startsWith('Bearer ')
        ? req.headers.authorization.split(' ')[1]
        : null);

    if (!token) {
      res.status(401);
      throw new Error('Not authorized — no token');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    if (!req.user) {
      res.status(401);
      throw new Error('User no longer exists');
    }
    next();
  } catch (err) {
    res.status(401);
    next(err);
  }
};

// Restrict to specific roles, e.g. admin
export const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user?.role)) {
      res.status(403);
      return next(new Error('Forbidden — insufficient permissions'));
    }
    next();
  };
