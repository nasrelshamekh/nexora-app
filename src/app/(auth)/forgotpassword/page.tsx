"use client"
import React from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Spinner } from "@/components/ui/spinner"
import { toast } from "sonner"
import { forgotPassword } from "@/actions/password.action"
import { forgotPasswordSchema, forgotPasswordFormType } from '@/schema/forgot-password.schema'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function ForgotPassword() {
  const router = useRouter()
  const form = useForm<forgotPasswordFormType>({
    resolver: zodResolver(forgotPasswordSchema),
    mode: "onTouched",
    defaultValues: { email: "" },
  })

  async function handleForgotPassword(values: forgotPasswordFormType) {
    try {
      
      const data = await forgotPassword(values.email)
      
      toast.success(data?.message, { position: "top-center" })
      form.reset()
      router.push(`/verifycode?email=${encodeURIComponent(values.email)}`)
    } catch (error) {
      toast.error((error as Error)?.message || "Failed to send reset email", { position: "top-center" })
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-4">
          <div className="flex justify-center items-center gap-3">
            <Avatar className="rounded-lg font-bold bg-black text-white size-10">
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <span className="font-bold text-2xl">Nexora</span>
          </div>

          <div className="text-center">
            <CardTitle className="text-2xl md:text-3xl">Forgot Password</CardTitle>
            <CardDescription className="mt-2">
              Enter your email and we&apos;ll send you a code to reset your password
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleForgotPassword)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full cursor-pointer" size="lg">
                {form.formState.isSubmitting ? <Spinner /> : "Send Reset Code"}
              </Button>
            </form>
          </Form>
          <div className="text-center text-sm pt-2">
                <Link href="/login" className="font-semibold hover:underline cursor-pointer">
                  <span className="text-gray-600">Back to Login </span>
                </Link>
              </div>
        </CardContent>
      </Card>
    </main>
  )
}