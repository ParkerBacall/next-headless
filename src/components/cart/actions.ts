'use server'
import createCart from "@/utils/Shopify/Cart/createCart";
import addToCart from "@/utils/Shopify/Cart/addToCart";
import { revalidateTag } from 'next/cache';

import { cookies } from 'next/headers';

export async function createCartAndSetCookie(id: string, quantity: number) {
    const cartId = await createCart(id, quantity);
    cookies().set('cartId', cartId);
  }
  

  export async function addItem(id: string, quantity: number) {
    let cartId = cookies().get('cartId')?.value;  
    
    if (!cartId) {
      return 'Error adding item to cart';
    }
  
    try {
      await addToCart(cartId, id, quantity);
      revalidateTag('cart')
    } catch (e) {
      return 'Error adding item to cart';
    }
  }


