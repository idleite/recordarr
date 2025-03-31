import 'server-only'
 
import { cookies } from 'next/headers'
import { getCurrentSession } from './server/session'
import { cache } from 'react'
import prisma from '@/libs/prisma'
import { redirect } from 'next/navigation'
export const verifySession = cache(async () => {
    const { session, user} = await getCurrentSession()
 
  if (!session?.user_id) {
    redirect('/signin')
  }
 
  return { isAuth: true, userId: session.user_id, user: user, role: user.role }
})