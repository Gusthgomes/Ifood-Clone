"use client";

import { CartContext } from "@/context/cart";
import { useContext } from "react";
import CartItem from "./CartItem";
import { Card, CardContent } from "./ui/card";
import { formatCurrency } from "@/helpers/price";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";

const Cart = () => {

    const { products, subtotalPrice, totalDiscount, totalPrice } = useContext(CartContext);

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

            <div className="mt-6">
                <Card>
                    <CardContent className="p-5 space-y-4">
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-xs text-muted-foreground">Subtotal</span>
                            <span>{ formatCurrency(subtotalPrice)}</span>
                        </div>

                        <Separator/>
                        
                        <div className="flex justify-between items-center text-xs">
                            <span className="text-xs text-muted-foreground">Entrega</span>
                            <span>
                                {Number(products[0].restaurant.deliveryFee) === 0
                                    ? <span className="uppercase text-primary">"Grátis"</span>
                                    : formatCurrency(Number(products[0].restaurant.deliveryFee))
                                }
                            </span>
                        </div>

                        <Separator/>

                        <div className="flex justify-between items-center text-xs">
                            <span className="text-xs text-muted-foreground">Desconto</span>
                            <span>{ formatCurrency(totalDiscount)}</span>
                        </div>

                        <Separator/>

                        <div className="flex justify-between items-center text-xs font-semibold">
                            <span className="text-xs">Total</span>
                            <span>{ formatCurrency(totalPrice)}</span>
                        </div>

                        <Separator/>
                    </CardContent>
                </Card>
            </div>

            <Button className="w-full mt-6">Finalizar pedido</Button>
        </div>
    );
}

export default Cart;