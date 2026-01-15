"use server"
import { getUserToken } from "@/lib/auth"
import { CheckoutFormValues } from "@/schema/checkout.schema"

export async function addToCart(productId: string) {
    const token = await getUserToken()
    if(!token) {
        throw new Error("You must be logged in to add a product to cart")
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/cart`, {
        method: "POST",
        body: JSON.stringify({ productId: productId }),
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}

export async function getLoggedUserCart() {
    const token = await getUserToken()
    if(!token) {
        throw new Error("You are not authorized to do this action")
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/cart`, {
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}

export async function deleteCartProduct(productId : string) {
    const token = await getUserToken()
    if(!token) {
        throw new Error("You are not authorized to do this action")
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/cart/${productId}`, {
        method: "DELETE",
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}

export async function updateCartProductCount(productId : string, newCount: number) {
    const token = await getUserToken()
    if(!token) {
        throw new Error("You are not authorized to do this action")
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/cart/${productId}`, {
        method: "PUT",
        body: JSON.stringify({count: newCount}),
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}

export async function clearUserCart() {
    const token = await getUserToken()
    if(!token) {
        throw new Error("You are not authorized to do this action")
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/cart/`, {
        method: "DELETE",
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}

export async function checkoutUser(formData: CheckoutFormValues, cartId: string) {
    const token = await getUserToken()
    if(!token) {
        throw new Error("You are not authorized to do this action")
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/orders/checkout-session/${cartId}?url=https://nexora-app-mu.vercel.app/`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}

export async function checkoutCashUser(formData: CheckoutFormValues, cartId: string) {
    const token = await getUserToken()
    if(!token) {
        throw new Error("You are not authorized to do this action")
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/orders/${cartId}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            token: token,
            "Content-Type": "application/json"
        }
    })
    const data = await response.json()
    return data
}