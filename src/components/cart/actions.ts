'use server'
import createCart from "@/utils/Shopify/Cart/createCart";
import addToCart from "@/utils/Shopify/Cart/addToCart";
import editCartItems from "@/utils/Shopify/Cart/editCartItems";

import { revalidateTag } from 'next/cache';

import { cookies } from 'next/headers';

export async function createCartAndSetCookie(id: string, quantity: number) {
    const cartId = await createCart(id, quantity);
    cookies().set('cartId', cartId);
  }
  
  export async function updateItem(id: string, quantity: number) {
    let cartId = cookies().get('cartId')?.value;      
    if (!cartId) {
      return 'Error adding item to cart';
    }
  
    try {
      await editCartItems(cartId, id, quantity);
      revalidateTag('cart')
    } catch (e) {
      return 'Error adding item to cart';
    }
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


