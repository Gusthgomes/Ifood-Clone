"use client";

import { Products, Restaurant, UserFavoriteRestaurant } from "@prisma/client";
import Image from "next/image";
import { Button } from "./ui/button";
import { ChevronLeftIcon, HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import UseToggleFavoriteRestaurant from "./hooks/useToggleFavoriteRestaurant";
import { useSession } from "next-auth/react";
import { isFavoriteRestaurant } from "@/helpers/isFavoriteRestaurant";

interface RestaurantImageProps {
    restaurants: Pick<Restaurant, "id" | "name" | "imageUrl">
    userFavoriteRestaurant: UserFavoriteRestaurant[];
};

const RestaurantImage = ({ restaurants, userFavoriteRestaurant }: RestaurantImageProps) => {

    const {data} = useSession();

    const router = useRouter();

    const isFavorite = isFavoriteRestaurant(restaurants.id, userFavoriteRestaurant);

    const { handleFavoriteClick } = UseToggleFavoriteRestaurant({
        restaurantId: restaurants.id,
        userId: data?.user?.id,
        restaurantIsCurrentlyFavorite: isFavorite,

    });

    const handleGoBackLink = () => {
        router.back();
    };

    return ( 
        <div className="relative h-[250px] w-full">
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

                <Button 
                    size="icon" 
                    className={`absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
                    onClick={handleFavoriteClick}
                >
                        <HeartIcon size={20} className="text-white fill-white"/>
                </Button>
        </div>
    );
}

export default RestaurantImage;