"use server"
import { SigninFormSchema, FormState } from '@/lib/definitions'
import { createSession, generateSessionToken, setSessionTokenCookie } from "@/lib/server/session";
import { createUser, verifyUsernameInput, getUserFromEmail, checkUserPassword } from "@/lib/server/user";
import { headers } from "next/headers";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";

export async function signin(formData: FormData) {
  // Validate form fields
  // console.log(formData)
  const validatedFields = SigninFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  })
 
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  const { email, password } = validatedFields.data
  const user = await getUserFromEmail(email);
  if (!user) {
    console.log("loseemail")
    return {
      errors: "Email or Password is wrong "
    }
  }
  // check if password is valid 

  console.log(user)
  if (!checkUserPassword(user?.id, password )) {
    console.log("losepass")
    return {
      errors: "Email or Password is wrong "
    }
  } else {
    const sessionToken = generateSessionToken();
    const session = await createSession(sessionToken, user.id);
    (await cookies()).set("session", sessionToken, {
      httpOnly: true,
      path: "/",
      secure: true ,
      sameSite: "lax",
      expires: session.expires_at
    });
    setSessionTokenCookie(sessionToken, session.expires_at);
    console.log("hello")
  }
// put in if statment


}