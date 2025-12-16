import jwt from "jsonwebtoken";

export type TokenRole = "admin" | "instructor" | "learner";

export interface TokenPayload {
  userId: string;
  role: TokenRole;
}

export function verifyToken(token: string): TokenPayload | null {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.error("AUTH_ERROR: JWT_SECRET is not configured");
    return null;
  }

  try {
    const decoded = jwt.verify(token, secret) as jwt.JwtPayload | string;

    if (typeof decoded === "string") {
      return null;
    }

    if (!decoded.userId || !decoded.role) {
      return null;
    }

    return {
      userId: decoded.userId as string,
      role: decoded.role as TokenRole,
    };
  } catch (error) {
    console.error("AUTH_ERROR: Invalid or expired token", error);
    return null;
  }
}

