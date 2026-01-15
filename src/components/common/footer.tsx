import React from 'react'
import Link from 'next/link'
import { Facebook, Instagram, Twitter } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <h4 className="text-2xl font-bold mb-6">Nexora Store</h4>
            <p className="text-gray-400 mb-6">
              Your one-stop shop for fashion and technology. Quality products, exceptional service.
            </p>
            <div className="flex space-x-4">
              <Button 
                variant="secondary" 
                size="icon" 
                className="w-10 h-10 rounded-full bg-white text-black hover:bg-gray-200"
                asChild
              >
                <Link href="https://facebook.com" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="w-10 h-10 rounded-full bg-white text-black hover:bg-gray-200"
                asChild
              >
                <Link href="https://instagram.com" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="secondary" 
                size="icon" 
                className="w-10 h-10 rounded-full bg-white text-black hover:bg-gray-200"
                asChild
              >
                <Link href="https://twitter.com" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div>
            <h5 className="text-lg font-bold mb-6">Store</h5>
            <ul className="space-y-3">
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/mens">Men&apos;s Clothing</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/womens">Women&apos;s Clothing</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/footwear">Footwear</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/electronics">Electronics</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/sale">Sale</Link>
                </Button>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-lg font-bold mb-6">Customer Service</h5>
            <ul className="space-y-3">
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/shipping">Shipping Info</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/returns">Returns & Exchanges</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/faq">FAQ</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/track">Track Order</Link>
                </Button>
              </li>
            </ul>
          </div>
          
          <div>
            <h5 className="text-lg font-bold mb-6">About</h5>
            <ul className="space-y-3">
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/about">About Us</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/careers">Careers</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/privacy">Privacy Policy</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/terms">Terms of Service</Link>
                </Button>
              </li>
              <li>
                <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
                  <Link href="/sustainability">Sustainability</Link>
                </Button>
              </li>
            </ul>
          </div>
        </div>
        
        <Separator className="bg-gray-800 mb-8" />
        
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">&copy; 2025 Nexora. All rights reserved.</p>
          <div className="flex space-x-6 text-sm">
            <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
              <Link href="/privacy">Privacy</Link>
            </Button>
            <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
              <Link href="/terms">Terms</Link>
            </Button>
            <Button variant="link" className="text-gray-400 hover:text-white p-0 h-auto" asChild>
              <Link href="/cookies">Cookies</Link>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}