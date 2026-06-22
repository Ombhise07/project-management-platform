import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";

export {};

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        role: string;
      };
    }
  }
}

// export interface AuthRequest extends Request {
//   user?: {
//     userId: string;
//     role: string;
//   };
// }

interface TokenPayload extends JwtPayload {
  userId: string;
  role: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  const token = authHeader.split(" ")[1]!;

  try {
    const decoded = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);

    if (typeof decoded === "string") {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    const payload = decoded as TokenPayload;

    req.user = {
      userId: payload.userId,
      role: payload.role,
    };

    next();
  } catch {
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};
