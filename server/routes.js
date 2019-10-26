import authC from './api/controllers/auth/controller';
import c from './api/controllers/main/controller';
import adminC from './api/controllers/admin/controller';

export default function routes(app) {
  app.use('/api/v1/search', c.search);
  app.use('/api/v1/login', authC.login);
  app.use('/api/v1/signup', authC.signup);
  app.use('/api/v1/admin', adminC.show);
}
