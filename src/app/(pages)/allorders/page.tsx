import React from 'react';
import { Package, Calendar, CreditCard, MapPin, Truck, Check, Clock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';

import { getUserOrders } from '@/actions/order.action';
import { getUserToken } from '@/lib/auth';
import { Order } from '@/interfaces/order';
import { jwtDecode } from 'jwt-decode';
import { DecodedTokenI } from '@/interfaces/decodedtoken';

export default async function OrdersPage() {
  let orders: Order[] = [];

  try {
    const token = await getUserToken();
    const decoded = jwtDecode<DecodedTokenI>(token);
    const userId = decoded.id;
    


    const ordersData = await getUserOrders(userId);
    orders = ordersData || [];
  } catch (error) {
    console.error(error)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getOrderStatus = (order: Order) => {
    if (order.isDelivered) {
      return { label: 'Delivered', variant: 'default' as const, icon: Check };
    } else if (order.isPaid) {
      return { label: 'Processing', variant: 'secondary' as const, icon: Truck };
    } else {
      return { label: 'Pending', variant: 'outline' as const, icon: Clock };
    }
  };

  const isEmpty = orders.length === 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black p-12">
        <div className="container mx-auto px-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Package className="size-12 text-white" />
              <h1 className="text-4xl font-bold text-white">My Orders</h1>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </Badge>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-5 py-12">
        {isEmpty ? (
          <section className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Package className="w-16 h-16 text-gray-400" />
            </div>
            <h2 className="text-3xl font-bold mb-4">No Orders Yet</h2>
            <p className="text-gray-600 text-lg mb-8">Start shopping to see your orders here!</p>
            <Button asChild size="lg">
              <Link href="/products">Browse Products</Link>
            </Button>
          </section>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => {
              const status = getOrderStatus(order);
              const StatusIcon = status.icon;

              return (
                <Card key={order._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="bg-gray-50">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <CardTitle className="text-xl">Order #{order._id.slice(-8).toUpperCase()}</CardTitle>
                          <Badge variant={status.variant} className="flex items-center gap-1">
                            <StatusIcon className="w-3 h-3" />
                            {status.label}
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(order.createdAt)}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CreditCard className="w-4 h-4" />
                            <span className="capitalize">{order.paymentMethodType}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <span>{order.shippingAddress.city}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-gray-600 mb-1">Total Amount</div>
                        <div className="text-2xl font-bold">EGP {order.totalOrderPrice.toFixed(2)}</div>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-6">
                    {/* Order Items */}
                    <div className="space-y-4">
                      {order.cartItems.map((item) => (
                        <div key={item._id} className="flex gap-4">
                          <Link href={`/products/${item.product._id}`} className="relative w-20 h-20 shrink-0">
                            <Image
                              src={item.product.imageCover}
                              alt={item.product.title}
                              fill
                              className="object-cover rounded-lg"
                              sizes="80px"
                            />
                          </Link>

                          <div className="flex-1 min-w-0">
                            <Link href={`/products/${item.product._id}`}>
                              <h3 className="font-semibold hover:underline line-clamp-1">
                                {item.product.title}
                              </h3>
                            </Link>
                            <p className="text-sm text-gray-600">{item.product.brand.name}</p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-sm text-gray-600">Qty: {item.count}</span>
                              <span className="font-semibold">EGP {item.price.toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <Separator className="my-4" />

                    {/* Shipping Address */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                        <div>
                          <h4 className="font-semibold mb-1">Shipping Address</h4>
                          <p className="text-sm text-gray-600">{order.shippingAddress.details}</p>
                          <p className="text-sm text-gray-600">{order.shippingAddress.city}</p>
                          <p className="text-sm text-gray-600">{order.shippingAddress.phone}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className="bg-gray-50 flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      {order.cartItems.length} {order.cartItems.length === 1 ? 'item' : 'items'}
                    </div>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}