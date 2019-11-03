import User, { validateUser } from '../../../models/users';
import l from '../../../common/logger';
import bcrypt from 'bcrypt';
import auth from '../../middlewares/auth';

export class Controller {
  async what(req, res, fn) {
    try {
      await fn(req, res);
    } catch (e) {
      l.error(e);
      res.status(500).send({ description: 'Internal error.' });
    }
  }

  static resp_with_token(res, user) {
    const token = user.generateAuthToken();
    const { _id, name, email, isAdmin } = user;
    res.header('x-auth-token', token).send({
      _id,
      name,
      email,
      isAdmin,
    });
  }

  async signup(req, res) {
    const { name, email } = req.body;

    const { error } = validateUser(req.body);
    if (error)
      return res.status(400).send({ description: error.details[0].message });

    //find an existing user
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists)
      return res.status(400).send({ description: 'User already registered.' });

    //TODO: this is a special hack for demonstration

    const isAdmin =
      email.startsWith('root') || email.startsWith('admin') ? true : false;

    const password = await bcrypt.hash(req.body.password, 10);
    const user = await new User({
      name,
      email,
      password,
      isAdmin,
    }).save();

    Controller.resp_with_token(res, user);
  }

  async login(req, res) {
    if (!req.body.email)
      return res.status(401).send({ description: 'Access denied' });

    const user = await User.findOne({ email: req.body.email });
    if (!user)
      return res
        .status(400)
        .send({ description: 'Login or password incorrect' });

    const ret = await bcrypt.compare(req.body.password, user.password);

    if (!ret)
      return res
        .status(400)
        .send({ description: 'Login or password incorrect' });

    Controller.resp_with_token(res, user);
  }
}

export default new Controller();
