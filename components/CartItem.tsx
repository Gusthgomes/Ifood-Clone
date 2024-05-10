"use client";

import { CartContext, CartProduct } from "@/context/cart";
import { calculateProductsTotalPrice, formatCurrency } from "@/helpers/price";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon, TrashIcon } from "lucide-react";
import { useContext } from "react";

interface CartItemProps {
    cartProduct: CartProduct;
};

const CartItem = ({ cartProduct }: CartItemProps) => {

    const { decreaseProductQuantity, increaseProductQuantity, removeProductFromCart } = useContext(CartContext);

    const handleDecreaseQuantityClick = () => decreaseProductQuantity(cartProduct.id);

    const handleIncreaseQuantityClick = () => increaseProductQuantity(cartProduct.id);

    const handleRemoveProductClick = () => removeProductFromCart(cartProduct.id);

    return ( 
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                {/* IMAGEM E INFO */}
                <div className="w-20 h-20 relative">
                    <Image 
                        src={ cartProduct.imageUrl }
                        alt={ cartProduct.name }
                        fill
                        className="object-cover aspect-square rounded-sm"
                    />
                </div>

                <div className="space-y-1">
                    <h3 className="text-xs"> { cartProduct.name } </h3>
                    <div className="flex items-center gap-1">
                        <h4 className="text-sm font-semibold">
                            { formatCurrency(calculateProductsTotalPrice(cartProduct) * cartProduct.quantity) }
                        </h4>
                        { cartProduct.discountPercentage > 0 && (
                            <span className="text-xs text-muted-foreground line-through">
                                { formatCurrency(Number(cartProduct.price) * cartProduct.quantity) }
                            </span>
                        )}
                    </div>

                    {/* QUANTIDADE */}
                    <div className="flex gap-3 text-center items-center">
                        <Button 
                            size="icon"
                            variant="ghost"
                            className="w-7 h-7 border-muted-foreground border border-solid"    
                        >
                            <ChevronLeftIcon size={16} onClick={ handleDecreaseQuantityClick }/>
                        </Button>
                        <span className="W-3 text-xs block">{ cartProduct.quantity }</span>
                        <Button 
                            size="icon" className="w-7 h-7"    
                        >
                            <ChevronRightIcon size={16} onClick={ handleIncreaseQuantityClick }/>
                        </Button>
                    </div>
                </div>
            </div>
            {/* BOTÃO DE DELETE */}
            <Button onClick={ handleRemoveProductClick } size="icon" className="w-8 h-8 border-muted-foreground border border-solid" variant="ghost">
                <TrashIcon size={ 18 }/>
            </Button>
        </div>
    );
}

export default CartItem;