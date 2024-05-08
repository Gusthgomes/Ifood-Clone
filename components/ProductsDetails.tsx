"use client";

import Image from "next/image";
import DiscountBadge from "./DiscountBadge";
import { calculateProductsTotalPrice, formatCurrency } from "@/helpers/price";
import { Prisma } from "@prisma/client";
import { Button } from "./ui/button";
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon, TimerIcon } from "lucide-react";
import { useState } from "react";
import { Card } from "./ui/card";

interface ProductsDetailsProps {
    products: Prisma.ProductsGetPayload<{
        include: {
            restaurant: true,
        },
    }>;
};

const ProductsDetails = ({ products }: ProductsDetailsProps) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncreaseQuantityClick =() => setQuantity(currentState => currentState + 1);
    const handleDecreaseQuantityClick =() => setQuantity(currentState => {
        if ( currentState === 1 ) return 1;
        return currentState - 1;
    });

    return ( 
        <div className="p-5">

                {/* RESTAURANTE */}
            <div className="flex items-center gap-[0.375rem]">
                <div className="relative h-6 w-6">
                    <Image
                        src={products?.restaurant?.imageUrl}
                        alt={products?.restaurant?.name}
                        fill
                        className="rounded-full object-cover"
                    />
                </div>
                <span className="text-xs text-muted-foreground">{ products?.restaurant?.name }</span>
            </div>

                {/* NOME DO PRODUTO */}
            <h1 className="text-xl font-semibold mb-2 mt-1">{ products.name }</h1>

            {/* PREÇO DO PRODUTO E QUANTIDADE */}
            <div className="flex justify-between">

                {/* PREÇO COM DESCONTO */}
                <div>
                    <div className="flex items-center gap-2">
                        <h2 className="text-xl font-semibold">
                            { formatCurrency(calculateProductsTotalPrice(products)) }
                        </h2>
                        {products.discountPercentage > 0 && (
                            <DiscountBadge products={products}/>
                        )}
                    </div>
                    {/* PREÇO ORIGINAL */}
                    { products.discountPercentage > 0 && (
                        <p className="text-sm text-muted-foreground">
                            De: { formatCurrency(Number(products.price)) }
                        </p>
                    )}
                </div>

                {/* QUANTIDADE */}
                <div className="flex gap-3 text-center items-center">
                    <Button 
                        size="icon"
                        variant="ghost"
                        className="border-muted-foreground border border-solid"
                        onClick={ handleDecreaseQuantityClick }
                    >
                        <ChevronLeftIcon/>
                    </Button>
                    <span className="w-4">{ quantity }</span>
                    <Button 
                        size="icon"
                        onClick={ handleIncreaseQuantityClick }
                    >
                        <ChevronRightIcon/>
                    </Button>
                </div>
            </div>

            {/* DADOS DA ENTREGA */}
            <Card className="flex justify-around py-2 mt-6">
                {/* CUSTO */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <BikeIcon size={14} className="text-primary"/>
                        <span className="text-xs">Entrega</span>
                    </div>


                    {Number(products.restaurant?.deliveryFee) > 0 ? (
                        <p className="text-xs font-semibold">
                            {formatCurrency(Number(products.restaurant?.deliveryFee))}
                        </p>
                    ) : (
                        <p className="text-xs font-semibold"> 
                            Grátis 
                        </p>
                    )}
                </div>

                {/* TEMPO */}
                <div className="flex flex-col items-center">
                    <div className="flex items-center gap-1 text-muted-foreground">
                        <TimerIcon size={14} className="text-primary"/>
                        <span className="text-xs">Entrega</span>
                    </div>


                    {Number(products.restaurant?.deliveryFee) > 0 ? (
                        <p className="text-xs font-semibold">
                            { products.restaurant?.deliveryTimeMinutes } min
                        </p>
                    ) : (
                        <p className="text-xs font-semibold"> 
                            Grátis 
                        </p>
                    )}
                </div>
            </Card>
        </div>
    );
}
export default ProductsDetails;