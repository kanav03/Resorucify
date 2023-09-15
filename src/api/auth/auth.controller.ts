import { Request, Response } from 'express';
import { HandleLoginUser, HandleSignupUser } from './auth.service';
import LoggerInstance from '../../loaders/logger';

export async function LoginUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send('Email and Password are required');
    }

    const token = await HandleLoginUser(email, password);

    return token;
  } catch (error) {
    LoggerInstance.error(error);
    return res.status(500).send('Internal Server Error');
  }
}

export async function SignupUser(req: Request, res: Response) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).send('Email and Password are required');
    }

    await HandleSignupUser(email, password);

    return res.status(200).send('User Created Successfully');
  } catch (error) {
    res.status(500).send('Internal Server Error');
  }
}
