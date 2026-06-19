import jwt, { type Secret, type SignOptions } from "jsonwebtoken";

const accessSecret = process.env.JWT_ACCESS_SECRET as Secret;
const refreshSecret = process.env.JWT_REFRESH_SECRET as Secret;

const accessExpiresIn = process.env.ACCESS_TOKEN_EXPIRES_IN as SignOptions["expiresIn"];

const refreshExpiresIn = process.env.REFRESH_TOKEN_EXPIRES_IN as SignOptions["expiresIn"];

export const generateAccessToken = (userId: string, role: string) => {
  return jwt.sign({ userId, role }, accessSecret, {
    expiresIn: accessExpiresIn,
  });
};

export const generateRefreshToken = (userId: string) => {
  return jwt.sign({ userId }, refreshSecret, {
    expiresIn: refreshExpiresIn,
  });
};
