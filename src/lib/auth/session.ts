import { getServerSession } from 'next-auth';
import { eq } from 'drizzle-orm';
import { authOptions } from './auth-options';
import { db } from '@/src/db/index';
import { users } from '@/src/db/schema';

export const getSession = async () => {
  const session = await getServerSession(authOptions);

  return session;
};

export const getCurrentUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    return null;
  }

  const [currentUser] = await db
    .select({
      userId: users.id,
      email: users.email,
      name: users.name,
      image: users.image,
    })
    .from(users)
    .where(eq(users.id, session.user.id));

  return currentUser;
};