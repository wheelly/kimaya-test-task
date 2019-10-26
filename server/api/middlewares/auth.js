import './common/env';
import jwt from 'jsonwebtoken';
import User from '../../../models/users';

export default async function auth(req, res, next, isAdmin = false) {
  //get the token from the header if present
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    req.user = decoded;
    if (isAdmin) {
      const user = await User.findById(req.user._id).select('isAdmin');
      if (!user.isAdmin) {
        return res.status(401).send('Access denied.');
      }
    }
    next();
  } catch (ex) {
    //if invalid token
    return res.status(400).send('Invalid token.');
  }
}
