import jwt, { SignOptions } from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

const createToken = (
  payload: JwtPayload,
  secret: string,
  expiresIn: string
) => {
  return jwt.sign(payload, secret, {
    expiresIn,
  } as SignOptions);
};


const verifyToken = (
  token: string,
  secret: string
) => {
  return jwt.verify(token, secret);
};


export const jwtHelper = {
  createToken,
  verifyToken,
};