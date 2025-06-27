import { defineEventHandler, readBody, createError } from 'h3';
// @ts-ignore

import * as bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig(event);
  const JWT_SECRET = config.private.JWT_SECRET;
  const users = useStorage('redis');
  try {
    const body = await readBody(event);
    const { username, password } = body;
    if (!username || !password) {
      throw createError({ statusCode: 400, statusMessage: 'Username and password required' });
    }
    const user = await users.getItem(`user:${username}`);
    if (!user) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
    }
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw createError({ statusCode: 401, statusMessage: 'Invalid credentials' });
    }
    // Generate JWT
    const token = jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
    return { token };
  } catch (error) {
    if (error.statusCode) throw error;
    throw createError({ statusCode: 500, statusMessage: 'Internal Server Error', data: { error: error.message } });
  }
}); 