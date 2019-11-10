import User, { validateUser } from '../../../models/users';
import l from '../../../common/logger';
import crypto from 'crypto';

export class Controller {

  static resp_with_token(res, user) {
    const token = user.generateAuthToken();
    const { _id, name, email, isAdmin } = user;
    l.debug(`Created token=${token}`);
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

    const password = crypto
      .pbkdf2Sync(req.body.password, 'salt', 100000, 64, 'sha512')
      .toString('hex');

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

    const crypted = crypto
      .pbkdf2Sync(req.body.password, 'salt', 100000, 64, 'sha512')
      .toString('hex');

    if (crypted !== user.password)
      return res
        .status(400)
        .send({ description: 'Login or password incorrect' });

    Controller.resp_with_token(res, user);
  }
}

export default new Controller();
