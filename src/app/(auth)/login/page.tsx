"use client"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Eye, EyeOff } from 'lucide-react'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import Link from 'next/link'
import { zodResolver } from "@hookform/resolvers/zod"
import { loginSchema, loginSchemaType } from '@/schema/auth.schema'
import { Spinner } from '@/components/ui/spinner'
import { useRouter } from 'next/navigation'
import { signIn } from "next-auth/react"
import { toast } from 'sonner'
import { cartContext } from '@/provider/cart-provider'
import { wishlistContext } from '@/provider/wishlist-provider'

export default function Login() {
  const [showPassword, setShowPassword] = useState(false)
  const { handleCart } = useContext(cartContext)
  const { handleWishlist } = useContext(wishlistContext)

  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(loginSchema),
    mode: "onTouched",
    defaultValues: {
      email: "",
      password: "",
    }
  })

  async function handleLogin(values: loginSchemaType) {
    
    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      
    })

    if (response?.ok) {
      toast.success("Logged in successfully", { position: 'top-center', duration: 3000 })
      router.push("/products")
      handleCart()
      handleWishlist()
    } else {
      toast.error(response?.error, { position: 'top-center', duration: 3000 })
    }
    

  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          {/* Logo */}
          <div className="flex justify-center items-center gap-3">
            <Avatar className="rounded-lg font-bold bg-black text-white size-10">
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <span className="font-bold text-2xl">Nexora</span>
          </div>

          {/* Title */}
          <div className="text-center">
            <CardTitle className="text-2xl md:text-3xl">Login to your account</CardTitle>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-4">

              {/* Email */}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />



              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Password"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-500" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-500" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* Submit Button */}
              <Button type="submit" className="w-full cursor-pointer" size="lg">
                {form.formState.isSubmitting ? <Spinner /> : "Login"}
              </Button>

              {/* Login Link */}
              <div className="text-center text-sm pt-2">
                <span className="text-gray-600">Don&apos;t have an account? </span>
                <Link href="/register" className="font-semibold hover:underline cursor-pointer">
                  Sign up
                </Link>
              </div>
              <div className="text-center text-sm pt-2">
                <Link href="/forgotpassword" className="font-semibold hover:underline cursor-pointer">
                  <span className="text-gray-600">Forgot your password? </span>
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  )
}