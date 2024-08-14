'use server'
import createCart from "@/utils/Shopify/Cart/createCart";
import { cookies } from 'next/headers';

export async function createCartAndSetCookie(id: string, quantity: number) {
    let cartId = await createCart(id, quantity);
    console.log('---', cartId)
    cookies().set('cartId', cartId);
  }
  