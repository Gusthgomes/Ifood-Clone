"use client";

import { createContext, ReactNode, useState } from "react";
import { Products } from "@prisma/client"; // Adicionar importação correta do cliente Prisma

export interface CartProduct extends Products {
    quantity: number;
}

interface ICartContext {
    products: CartProduct[];
    addProductToCart: (product: Products, quantity: number) => void; 
}

export const CartContext = createContext<ICartContext>({
    products: [],
    addProductToCart: () => {},
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<CartProduct[]>([]); 
    const addProductToCart = (product: Products, quantity: number) => {
        const isProductAlreadyOnCart = products.some((cartProduct) => cartProduct.id === product.id);

        if (isProductAlreadyOnCart) {
            setProducts((prev) =>
                prev.map((cartProduct) => {
                    if (cartProduct.id === product.id) {
                        return {
                            ...cartProduct,
                            quantity: cartProduct.quantity + quantity,
                        };
                    }
                    return cartProduct;
                })
            );
        } else {
            setProducts((prev) => [...prev, { ...product, quantity }]);
        }
    };

    return (
        <CartContext.Provider value={{ products, addProductToCart }}>
            {children}
        </CartContext.Provider>
    );
};
