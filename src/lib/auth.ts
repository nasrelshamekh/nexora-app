import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
    const myCookies = await cookies()
    const encryptedToken = myCookies.get("next-auth.session-token")?.value || myCookies.get("__Secure-next-auth.session-token")?.value
    const token = await decode({ token: encryptedToken, secret: process.env.AUTH_SECRET! })
    return token?.token as string
}