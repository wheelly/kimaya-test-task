import * as express from 'express';
import c from './controller';

export default express
  .Router()
  .post('/login', c.login)
  .post('/signup', c.signup);
