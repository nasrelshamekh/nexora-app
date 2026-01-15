import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Spinner } from '@/components/ui/spinner'
import React from 'react'

export default function Loading() {
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen gap-6'>
          <div className="flex justify-center items-center gap-3">
            <Avatar className="rounded-lg text-xl flex items-center justify-center font-bold bg-black text-white size-9">
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <span className="font-bold text-2xl">Nexora</span>
          </div>
          <Spinner className="size-12" />
        </div>
    </>
  )
}
