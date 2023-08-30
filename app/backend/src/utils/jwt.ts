import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  email: string,
};

function generateToken(payload: TokenPayload): string {
  const token = jwt.sign(payload, secret);
  return token;
}

function verifyToken(token: string): TokenPayload {
  const verify = jwt.verify(token, secret) as TokenPayload;
  return verify;
}

export default {
  generateToken,
  verifyToken,
};
