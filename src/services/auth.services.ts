import { loginSchemaType, registerSchemaType } from "@/schema/auth.schema"

export async function registerUser(formData: registerSchemaType) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/auth/signup`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}

export async function loginUser(formData: loginSchemaType) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/auth/signin`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}