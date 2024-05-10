"use client";

import { createContext, ReactNode, useMemo, useState } from "react";
import { Prisma, Products } from "@prisma/client";
import { calculateProductsTotalPrice } from "@/helpers/price";

export interface CartProduct extends Prisma.ProductsGetPayload<{ include: {
    restaurant: {
        select: {
            deliveryFee: true,
        }
    }
}}> {
    quantity: number;
}

interface ICartContext {
    products: CartProduct[];
    subtotalPrice: number;
    totalPrice: number;
    totalDiscount: number;
    addProductToCart: (product: Products, quantity: number) => void;
    decreaseProductQuantity: (productId: string) => void;
    increaseProductQuantity: (productId: string) => void
    removeProductFromCart: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
    products: [],
    subtotalPrice: 0,
    totalPrice: 0,
    totalDiscount: 0,
    addProductToCart: () => {},
    decreaseProductQuantity: () => {},
    increaseProductQuantity: () => {},
    removeProductFromCart: () => {}
});

export const CartProvider = ({ children }: { children: ReactNode }) => {
    const [products, setProducts] = useState<CartProduct[]>([]); 

    const subtotalPrice = useMemo(() => {
        return products.reduce((acc, products) => {
            return acc + Number(products.price) * products.quantity;
        }, 0)
    }, [products]);

    const totalPrice = useMemo(() => {
        return products.reduce((acc, products) => {
            return acc + calculateProductsTotalPrice(products) * products.quantity;
        }, 0)
    }, [products]);

    const totalDiscount = subtotalPrice - totalPrice;

    const decreaseProductQuantity = (
        productId: string,
    ) => {
        return setProducts((prev) =>
            prev.map((cartProduct) => {
            if (cartProduct.id === productId) {
                if (cartProduct.quantity === 1) {
                    return cartProduct;
                }
    
            return {
                ...cartProduct,
                quantity: cartProduct.quantity - 1,
                };
            }
    
            return cartProduct;
            }),
        );
    };

    const increaseProductQuantity = (
        productId: string,
    ) => {
        return setProducts((prev) =>
            prev.map((cartProduct) => {
                if (cartProduct.id === productId) {
                    return {
                ...cartProduct,
                quantity: cartProduct.quantity + 1,
                };
            }
    
            return cartProduct;
            }),
        );
    };

    const removeProductFromCart = (productId: string) => {
        return setProducts((prev) => prev.filter((products) => products.id !== productId));
    }

    const addProductToCart = (product: Products, quantity: number) => {
        // VERIFICA SE O PRODUTO JÁ ESTÁ NA SACOLA
        const isProductAlreadyOnCart = products.some((cartProduct) => cartProduct.id === product.id);
        // SE ESTIVER NO IF, AUMENTA A QUANTIDADE
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
            //@ts-ignore
            setProducts((prev) => [...prev, { ...product, quantity }]);
        }
    };

    return (
        <CartContext.Provider 
            value={{ 
                products,
                subtotalPrice,
                totalPrice,
                totalDiscount,
                addProductToCart, 
                decreaseProductQuantity, 
                increaseProductQuantity,
                removeProductFromCart,
            }}>
                {children}
        </CartContext.Provider>
    );
};
