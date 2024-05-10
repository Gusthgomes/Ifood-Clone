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
    totalQuantity: number;
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
    totalQuantity: 0,
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
        }, 0) + Number(products[0]?.restaurant?.deliveryFee)
    }, [products]);

    const totalQuantity = useMemo(() => {
        return products.reduce((acc, products) => {
            return acc + products.quantity;
        }, 0)
    }, [products]);

    const totalDiscount = subtotalPrice - totalPrice + Number(products[0]?.restaurant?.deliveryFee);

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

    const addProductToCart = (
        product: Prisma.ProductsGetPayload<{
            include: {
                restaurant: {
                    select: {
                        deliveryFee: true,
                    };
                };
            };
        }>, 
        quantity: number,
        emptyCart: boolean
    ) => {

        // VERIFICAR SE HÁ UM PRODUTO DE OUTRO RESTAURANTE NA SACOLA
        const hasDifferentRestaurantProduct = products.some(
            (CartProduct) => CartProduct.restaurantId !== product.restaurantId
        );

        if ( hasDifferentRestaurantProduct) {
            setProducts([]);
        };

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
                totalQuantity,
                totalDiscount,
                //@ts-ignore
                addProductToCart, 
                decreaseProductQuantity, 
                increaseProductQuantity,
                removeProductFromCart,
            }}>
                {children}
        </CartContext.Provider>
    );
};
