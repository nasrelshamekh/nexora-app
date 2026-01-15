import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
    const token = await getToken({ req: request })
    const { pathname } = request.nextUrl

    const authPages = pathname == "/login" || pathname == "/register" || pathname == "/forgotpassword"
    const loggedInPages = pathname == "/allorders" || pathname == "/changepassword"

    if (token && authPages) {
        return NextResponse.redirect(new URL("/", request.url))
    }
    if (!token && !authPages) {
        return NextResponse.redirect(new URL("/login", request.url))
    }
    if (!token && loggedInPages) {
        return NextResponse.redirect(new URL("/login", request.url))
    }

    return NextResponse.next()

}

export const config = {
    matcher: ["/cart", "/brands", "/categories", "/login", "/register", "/allorders", "/changepassword", "/forgotpassword"]
}