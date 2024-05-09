//@ts-ignore
import { calculateProductsTotalPrice, formatCurrency } from "@/helpers/price";
import { cn } from "@/lib/utils";
//@ts-ignore
import { Prisma, Product } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ProductItemProps {
    //@ts-ignore
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true;
                },
            },
        },
    }>;
    className: string;
}

const ProductItem = ({ product, className }: ProductItemProps) => {
    return (
        <Link className={ cn("w-[150px] min-w-[150px]", className) } href={`/products/${product.id}`}>
            <div className="space-y-2 w-full">
                <div className="w-full aspect-square relative">
                    <Image 
                        src={product.imageUrl}
                        alt={product.name}
                        fill
                        className="object-cover rounded-lg shadow-md"
                    />
                    {product.discountPercentage > 0 && (
                        <div className="absolute top-2 left-2 gap-[2px] flex items-center bg-primary py-[2px] px-2 rounded-full text-white">
                            <ArrowDownIcon size={12} className="font-semibold"/>
                            <span className="font-semibold text-xs">{product.discountPercentage}%</span>
                        </div>
                    )}
                </div>
                <h2 className="text-sm truncate">{product.name}</h2>
                <div className="flex gap-1 items-center">
                <h3 className="font-semibold">
                    {formatCurrency(calculateProductsTotalPrice(product))}
                </h3>
                {product.discountPercentage > 0 && (
                    <span className="line-through text-muted-foreground text-xs">
                        {formatCurrency(Number(product.price))}
                    </span>
                )}
                </div>

                <span className="text-xs text-muted-foreground block">{product.restaurant.name}</span>
                
            </div>
        </Link>
    );
}

export default ProductItem;
