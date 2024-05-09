"use client";

import Image from "next/image";
import DiscountBadge from "./DiscountBadge";
import { calculateProductsTotalPrice, formatCurrency } from "@/helpers/price";
import { Prisma } from "@prisma/client";
import { Button } from "./ui/button";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import ProductList from "./ProductList";
import DeliveryInfo from "./DeliveryInfo";

interface ProductsDetailsProps {
    products: Prisma.ProductsGetPayload<{
        include: {
            restaurant: true,
        },
    }>;
    //@ts-ignore
    complementaryProducts: Prisma.ProductsPayload<{
        include: {
            restaurant: true,
        },
    }>[];
};

const ProductsDetails = ({ products, complementaryProducts }: ProductsDetailsProps) => {
    const [quantity, setQuantity] = useState(1);

    const handleIncreaseQuantityClick =() => setQuantity(currentState => currentState + 1);
    const handleDecreaseQuantityClick =() => setQuantity(currentState => {
        if ( currentState === 1 ) return 1;
        return currentState - 1;
    });

    return ( 
        <div className="relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">

                {/* RESTAURANTE */}
            <div className="flex items-center gap-[0.375rem] px-5">
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
            <h1 className="text-xl font-semibold mb-2 mt-1 px-5">{ products.name }</h1>

            {/* PREÇO DO PRODUTO E QUANTIDADE */}
            <div className="flex justify-between px-5">

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
            <div className="px-5">
                <DeliveryInfo restaurant={ products.restaurant }/>
            </div>
            <div className="mt-6 space-y-3 px-5">
                <h3 className="font-semibold">Sobre</h3>
                <p className="text-sm text-muted-foreground">{ products.description }</p>
            </div>  

            <div className="mt-6 space-y-3">
                <h3 className="px-5 font-semibold">Sucos</h3>
                <ProductList product={complementaryProducts}/>
            </div>

            <div className="mt-6 px-5">
                <Button className="w-full font-semibold">Adicionar a sacola</Button>
            </div>     

        </div>
    );
}
export default ProductsDetails;