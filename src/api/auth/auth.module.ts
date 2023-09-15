import { Router } from 'express';
import { LoginUser, SignupUser } from './auth.controller';

export default (): Router => {
  const app = Router();

  app.post('/login', LoginUser);
  app.post('/signup', SignupUser);

  return app;
};
