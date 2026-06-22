import { prisma } from "../config/prisma.js";
import { hashPassword, comparePassword } from "../utils/hash.js";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt.js";

import { verifyRefreshToken } from "../utils/jwt.js";

// register user
export const registerUser = async (name: string, email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const passwordHash = await hashPassword(password);

  const user = await prisma.user.create({
    data: {
      name,
      email,
      passwordHash,
    },
  });

  return user;
};

// login User
export const loginUser = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await comparePassword(password, user.passwordHash);

  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const accessToken = generateAccessToken(user.id, user.role);

  const refreshToken = generateRefreshToken(user.id);

  await prisma.user.update({
    where: { id: user.id },
    data: { refreshToken },
  });

  return {
    user,
    accessToken,
    refreshToken,
  };
};

// referesh User
export const refreshUserToken = async (refreshToken: string) => {
  const decoded = verifyRefreshToken(refreshToken);

  const user = await prisma.user.findUnique({
    where: { id: decoded.userId },
  });

  if (!user || user.refreshToken !== refreshToken) {
    throw new Error("Invalid refresh token");
  }

  const accessToken = generateAccessToken(user.id, user.role);

  return accessToken;
};

// logout User
export const logoutUser = async (userId: string) => {
  await prisma.user.update({
    where: { id: userId },
    data: {
      refreshToken: null,
    },
  });
};
