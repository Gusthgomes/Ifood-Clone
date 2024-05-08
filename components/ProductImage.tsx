"use client";

import { Products } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProductImageProps {
    products: Pick<Products, "name" | "imageUrl">
};

const ProductImage = ({ products }: ProductImageProps) => {

    const router = useRouter();

    const handleGoBackLink = () => {
        router.back();
    };

    return ( 
        <div className="relative h-[360px] w-full">
            <Image 
                    src={products?.imageUrl} 
                    alt={products?.name} 
                    fill 
                    className="object-cover shadow-md"
                />

                <Button 
                    className="absolute top-4 left-4 rounded-full bg-white text-foreground hover:text-white" 
                    size="icon"
                    onClick={ handleGoBackLink }
                >
                    <ChevronLeftIcon/>
                </Button>
        </div>
     );
}
 
export default ProductImage;