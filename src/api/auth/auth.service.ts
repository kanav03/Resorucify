import db from '../../loaders/database';
import * as argon from 'argon2';
import generateToken from '../../utils/jwt';

export async function HandleLoginUser(email: string, password: string) {
  const res = await (await db()).collection('users').findOne({ email: email });

  if (!res) {
    res.status(404).send(`User with email ${email}`);
  }

  const res1 = argon.verify(password, res.hash);

  if (!res1) {
    res.status(401).send(`Inavlid Password`);
  }

  return generateToken(email);
}

export async function HandleSignupUser(email: string, password: string) {
  const users = (await db()).collection('users');
  const res = await users.findOne({ email: email });
  if (res) {
    res.status(409).send(`User with email ${email} already exists`);
  }

  const hash = await argon.hash(password);

  return await users.insertOne({ email: email, hash: hash, isDeleted: Boolean, projects: [], createdAt: new Date() });
}
