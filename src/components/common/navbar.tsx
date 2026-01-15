"use client"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink
} from "@/components/ui/navigation-menu"
import {
    Avatar,
    AvatarFallback
} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Heart, Menu, ShoppingCart, UserRound } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { signOut, useSession } from "next-auth/react"
import { useContext } from "react"
import { cartContext } from "@/provider/cart-provider"
import { Spinner } from "../ui/spinner"
import { wishlistContext } from "@/provider/wishlist-provider"


export default function Navbar() {
    const { data: session } = useSession()
    const { noOfCartItems, isLoading } = useContext(cartContext)
    const { count, isLoadingWishlist } = useContext(wishlistContext)

    function logoutUser() {
        signOut({ callbackUrl: "/" })
    }

    return (
        <>
            <nav className="bg-[#F5F5F5E5] fixed w-full z-50">
                <div className="container mx-auto p-5 flex items-center justify-between">
                    <Link href={"/"}>
                        <div className="nav-logo flex items-center gap-3">
                            <Avatar className="rounded-lg text-xl font-bold bg-black text-white size-9">
                                <AvatarFallback>N</AvatarFallback>
                            </Avatar>
                            <span className="font-bold text-2xl">Nexora</span>
                        </div>
                    </Link>
                    <div className="hidden md:flex nav-links absolute left-1/2 -translate-x-1/2">
                        <NavigationMenu className="gap-2">
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href={"/products"}>Products</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href={"/brands"}>Brands</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href={"/categories"}>Categories</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenu>
                    </div>
                    <div className="nav-actions flex items-center gap-4">
                        <DropdownMenu modal={false}>
                            <p className="font-semibold hidden lg:block">{session && `Welcome, ${session.user?.name}`}</p>
                            <DropdownMenuTrigger className="cursor-pointer flex gap-2">
                                <UserRound />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                {session && <p className="px-2 py-1.5 text-sm font-semibold lg:hidden">Welcome, {session.user?.name}</p>}
                                <DropdownMenuSeparator />
                                {session ? <>
                                    <Link href={"/changepassword"}>
                                        <DropdownMenuItem>Change Password</DropdownMenuItem>
                                    </Link>
                                    <Link href={"/allorders"}>
                                        <DropdownMenuItem>Your Orders</DropdownMenuItem>
                                    </Link>
                                    <DropdownMenuItem onClick={logoutUser}>Logout</DropdownMenuItem>
                                </> : <>
                                    <Link href={"/login"}>
                                        <DropdownMenuItem>Login</DropdownMenuItem>
                                    </Link>
                                    <Link href={"/register"}>
                                        <DropdownMenuItem>Register</DropdownMenuItem>
                                    </Link>
                                </>}
                            </DropdownMenuContent>
                        </DropdownMenu>
                        {session && <Link href={"/cart"} className="relative">
                            <ShoppingCart />
                            <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                                {isLoading ? <Spinner /> : <>{noOfCartItems}</>}
                            </Badge>
                        </Link>}
                        {session && <Link href={"/wishlist"} className="relative">
                            <Heart />
                            <Badge className="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums absolute top-0 right-0 translate-x-1/2 -translate-y-1/2">
                                {isLoadingWishlist ? <Spinner /> : <>{count}</>}
                            </Badge>
                        </Link>}
                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="md:hidden">
                                    <Menu className="size-6" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="right" className="bg-white text-black border-black">
                                <nav className="flex flex-col gap-4 mt-8">
                                    <Link href={"/products"} className="text-lg font-medium hover:text-white hover:bg-black p-2">Products</Link>
                                    <Link href={"/brands"} className="text-lg font-medium hover:text-white hover:bg-black p-2">Brands</Link>
                                    <Link href={"/categories"} className="text-lg font-medium hover:text-white hover:bg-black p-2">Categories</Link>
                                </nav>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </nav>
        </>
    )
}