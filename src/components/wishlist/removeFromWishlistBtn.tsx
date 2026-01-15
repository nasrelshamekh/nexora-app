"use client"

import React, { useContext, useState } from 'react'
import { X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { removeFromWishlist } from '@/actions/wishlist.action'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'
import { Spinner } from '@/components/ui/spinner'
import { wishlistContext } from '@/provider/wishlist-provider'

export default function RemoveWishlistButton({ prodId }: { prodId: string }) {
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const { handleWishlist } = useContext(wishlistContext)

    async function handleRemove(productId: string) {
        try {
            setIsLoading(true)
            const response = await removeFromWishlist(productId)
            
            if (response.status === "success") {
                toast.success(response.message || "Removed from wishlist", { 
                    position: "top-center" 
                })
                router.refresh()
                handleWishlist()
            }
        } catch (error) {
            
            toast.error((error as Error).message || "Failed to remove from wishlist", { 
                position: "top-center" 
            })
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            disabled={isLoading}
            onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleRemove(prodId)
            }}
            variant="ghost"
            size="icon"
            className="bg-white hover:bg-red-50 rounded-full shadow-lg cursor-pointer"
        >
            {isLoading ? (
                <Spinner className="w-5 h-5" />
            ) : (
                <X className="w-5 h-5 text-gray-700 hover:text-red-600" />
            )}
        </Button>
    )
}