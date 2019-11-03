import jwt from 'jsonwebtoken';
import User from '../../models/users';
import l from '../../common/logger'

export default async function auth(req, res, next, checkAdminPerm = false) {
  //get the token from the header if present
  const token = req.headers['x-access-token'] || req.headers['authorization'];
  l.debug(`Got token=${token}`)
  //if no token found, return response (without going to the next middelware)
  if (!token) return res.status(401).send({ description: 'Access denied' });

  try {
    //if can verify the token, set req.user and pass to next middleware
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    l.debug(`User=${JSON.stringify(decoded)}`)
    req.user = decoded;

    if (checkAdminPerm) {
      l.info('Making sure this user is admin')
      const user = await User.findById(req.user._id).select('isAdmin');
      if (!user.isAdmin) {
        return res.status(401).send({ description: 'Access denied'});
      }
    }
    next()
  } catch (ex) {
    //if invalid token
    return res.status(400).send({ description: 'Invalid token.' });
  }
}
