import * as express from 'express';
import c from './controller';

export default express
    .Router()
    .post('/login', (req, res) => c.what(req, res, c.login))
    .post('/signup', (req, res) => c.what(req, res, c.signup))