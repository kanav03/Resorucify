import { Router } from 'express';
import AuthRouter from './auth/auth.module';

export default (): Router => {
  const app = Router();

  app.use('/auth', AuthRouter());
  return app;
};
