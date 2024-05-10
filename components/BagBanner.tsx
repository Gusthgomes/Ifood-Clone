"use client";

import { CartContext } from "@/context/cart";
import { formatCurrency } from "@/helpers/price";
import { Restaurant } from "@prisma/client";
import { useContext } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";
import Cart from "./Cart";

interface BagBannerProps {
    restaurant: Pick<Restaurant, "id">
};

const BagBanner = ({ restaurant }: BagBannerProps) => {
    const { products, totalPrice, totalQuantity } = useContext(CartContext);

    const restaurantHasProductsOnBag = products.filter(
        (product) => product.restaurantId === restaurant.id
    );

    if (!restaurantHasProductsOnBag) return null;

    return ( 
        <div className="fixed bottom-0 left-0 z-50 w-full border-t border-solid border-muted shadow-md rounded-lg bg-white p-5 pt-3">
            <div className="flex justify-between items-center">
                {/* PREÇO */}
                <div>
                    <span className="text-xs text-muted-foreground">Total sem entrega</span>
                    <h3 className="font-semibold">
                        { formatCurrency(totalPrice)} 
                        <span className="text-xs text-muted-foreground"> 
                        / { totalQuantity } { totalQuantity > 1 ? "itens" : "item"}
                        </span>
                    </h3>
                </div>
                {/* BOTÃO */}
                <Sheet>
                    <SheetTrigger>
                        <Button>Ver sacola</Button>
                    </SheetTrigger>
                        <SheetContent className="w-[90vw]">
                            <SheetHeader>
                                <SheetTitle className="text-left">Sacola</SheetTitle>
                                </SheetHeader>
                            <Cart/>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
    );
}

export default BagBanner;