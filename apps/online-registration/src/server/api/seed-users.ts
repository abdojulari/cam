import * as bcrypt from 'bcryptjs';
// @ts-ignore
import { useRuntimeConfig } from '#imports';

async function seedUsers() {
  const config = useRuntimeConfig();
  const users = config.private.userSeed;

  if (!users) {
    throw new Error('USER_SEED is not defined in .env');
  }

  const usersArray = JSON.parse(users);
  // @ts-ignore
  const storage = useStorage('redis');

  for (const user of usersArray) {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    await storage.setItem(`user:${user.username}`, {
      username: user.username,
      password: hashedPassword,
    });
    console.log(`Seeded user: ${user.username}`);
  }
  console.log('All users seeded.');
}

seedUsers().catch(console.error); 