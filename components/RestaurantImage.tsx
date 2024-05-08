"use client";

import { Products, Restaurant } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface RestaurantImageProps {
    restaurants: Pick<Restaurant, "name" | "imageUrl">
};

const RestaurantImage = ({ restaurants }: RestaurantImageProps) => {

    const router = useRouter();

    const handleGoBackLink = () => {
        router.back();
    };

    return ( 
        <div className="relative h-[215px] w-full">
            <Image 
                    src={restaurants?.imageUrl} 
                    alt={restaurants?.name} 
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

                <Button size="icon" className="absolute top-4 right-4 bg-muted-foreground rounded-full">
                        <HeartIcon size={20} className="text-white fill-white"/>
                </Button>
        </div>
    );
}

export default RestaurantImage;