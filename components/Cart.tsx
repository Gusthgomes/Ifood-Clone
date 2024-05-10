"use client";

import { CartContext } from "@/context/cart";
import { useContext } from "react";
import CartItem from "./CartItem";

const Cart = () => {

    const { products } = useContext(CartContext);

    return ( 
        <div className="py-5">
            <div className="space-y-4">
                { products.map( product => (
                    <CartItem
                        key={product.id}
                        cartProduct={product}
                    />
                ))}
            </div>
        </div>
    );
}

export default Cart;