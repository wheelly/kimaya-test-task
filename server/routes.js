import mainRouter from './api/controllers/main/router';
import authRouter from './api/controllers/auth/router';
import adminRouter from './api/controllers/admin/router';

export default function routes(app) {
  app.use('/api/v1/main', mainRouter)
  app.use('/api/v1/user', authRouter);
  app.use('/api/v1/admin', adminRouter);
}
