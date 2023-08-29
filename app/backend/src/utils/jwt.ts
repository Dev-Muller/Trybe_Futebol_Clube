import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || 'secret';

type TokenPayload = {
  id: number,
  username: string,
};

function logar(payload: TokenPayload): string {
  const token = jwt.sign(payload, secret);
  return token;
}

function verificar(token: string): TokenPayload {
  const verify = jwt.verify(token, secret) as TokenPayload;
  return verify;
}

export {
  logar,
  verificar,
};
