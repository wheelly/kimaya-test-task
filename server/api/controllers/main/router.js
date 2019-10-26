import * as express from 'express';
import c from './controller';
import auth from '../../middlewares/auth';

export default express
  .Router()
  .use(auth) //we protect main page - authorised users only
  .get('/search', c.search);
