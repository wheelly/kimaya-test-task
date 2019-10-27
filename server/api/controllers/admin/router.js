import * as express from 'express';
import c from './controller';
import auth from '../../middlewares/auth';

export default express
    .Router()
    .use(async (req, res, next) => await auth(req, res, next, true)) //we protect main page - authorised users only
    .get('/', c.stats);