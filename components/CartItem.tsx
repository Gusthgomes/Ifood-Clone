import { CartProduct } from "@/context/cart";
import { calculateProductsTotalPrice, formatCurrency } from "@/helpers/price";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

interface CartItemProps {
    cartProduct: CartProduct;
};

const CartItem = ({ cartProduct }: CartItemProps) => {
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
                            { formatCurrency(calculateProductsTotalPrice(cartProduct)) }
                        </h4>
                        { cartProduct.discountPercentage > 0 && (
                            <span className="text-xs text-muted-foreground line-through">
                                { formatCurrency(Number(cartProduct.price)) }
                            </span>
                        )}
                    </div>

                    {/* QUANTIDADE */}
                    <div className="flex gap-3 text-center items-center">
                        <Button 
                            size="icon"
                            variant="ghost"
                            className="w-8 h-8 border-muted-foreground border border-solid"    
                        >
                            <ChevronLeftIcon size={18}/>
                        </Button>
                        <span className="w-2 text-sm">{ cartProduct.quantity }</span>
                        <Button 
                            size="icon" className="w-8 h-8"    
                        >
                            <ChevronRightIcon size={18}/>
                        </Button>
                    </div>
                </div>
            </div>
            {/* BOTÃO DE DELETE */}
        </div>
    );
}

export default CartItem;