"use server"
import { getUserToken } from "@/lib/auth"

export async function forgotPassword( userEmail: string) {

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/auth/forgotPasswords`, {
        method: "POST",
        body: JSON.stringify({ email: userEmail }),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    
    return data
}

export async function changePassword(currentPassword: string, newPassword: string, rePassword: string) {
    const token = await getUserToken()
    if (!token) {
        throw new Error("You must be logged in to change your password")
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/users/changeMyPassword`, {
        method: "PUT",
        headers: {
            token: token,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            currentPassword,
            password: newPassword,
            rePassword
        })
    })

    const data = await response.json()
    return data
}