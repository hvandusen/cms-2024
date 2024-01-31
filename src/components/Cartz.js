import React from "react"
import { useShoppingCart } from 'use-shopping-cart'
// import { CartItems } from './CartItems'
const Cart = () => {
  /* Gets the totalPrice and a method for redirecting to stripe */
  const shopping_cart = useShoppingCart()
  const {clearCart} = shopping_cart
  const opened = shopping_cart.cartCount > 0 ? "opened" : "";
  return <div className={`cart ${opened}`}>
      {/* {shopping_cart.cartCount && shopping_cart.cartCount > 0 ? (<div className="cart-stuff">
          <div className="cart-count">{shopping_cart.cartCount}</div>
            <button onClick={clearCart}>clear cart</button>
            <button className="checkout" onClick={() => shopping_cart.redirectToCheckout()}>checkout</button>
          </div>) : ""
      } */}
    </div>
  
}

export const CartCount = () => {
  const {count} = useShoppingCart()
  return count
}



export default Cart
