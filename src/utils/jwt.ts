require('dotenv').config();
import * as JWT from 'jsonwebtoken';

export default function generateToken(email: string): string {
  return JWT.sign({ email }, process.env.JWT_SECRET, {
    expiresIn: '5d',
  });
}

export function verifyToken(token: string) {
  const data = JWT.verify(token, process.env.JWT_SECRET) as string;

  return data as unknown as { email: string };
}
