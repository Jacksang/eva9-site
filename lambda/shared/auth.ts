/**
 * Auth utilities — JWT & password hashing.
 * Uses jsonwebtoken + bcryptjs for serverless-friendly operation.
 */
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'eva9-dev-secret-change-in-production';
const ADMIN_JWT_SECRET = process.env.ADMIN_JWT_SECRET || JWT_SECRET;
const SALT_ROUNDS = 10;

export interface TokenPayload {
  email: string;
  role: 'user' | 'admin';
  sub?: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function signToken(payload: TokenPayload, expiresIn = '7d'): string {
  const secret = payload.role === 'admin' ? ADMIN_JWT_SECRET : JWT_SECRET;
  return jwt.sign(payload, secret, { expiresIn });
}

export function verifyToken(token: string, role?: 'user' | 'admin'): TokenPayload | null {
  try {
    const secret = role === 'admin' ? ADMIN_JWT_SECRET : JWT_SECRET;
    return jwt.verify(token, secret) as TokenPayload;
  } catch {
    return null;
  }
}

export function generateVerificationCode(): string {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}
