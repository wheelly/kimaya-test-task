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
      res
        .status(500)
        .send({ ok: false, code: 500, description: 'Internal error.' });
    }
  }

  async signup(req, res) {
    const { name, email } = req.body;

    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //find an existing user
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(400).send("User already registered.");

    const password = await bcrypt.hash(req.password, 10);
    const user = await new User({
      name,
      email,
      password,
    }).save();

    const token = user.generateAuthToken();
    res.header('x-auth-token', token).send({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  }

  async login(req, res) {
    await auth(req, res);
    const user = await User.findById(req.user._id).select(
      '-password',
      '-isAdmin'
    );
    res.send(user);
  }
}

export default new Controller();
