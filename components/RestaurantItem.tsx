"use client";

import { formatCurrency } from "@/helpers/price";
import { Restaurant, UserFavoriteRestaurant } from "@prisma/client"
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toggleFavoriteRestaurant } from "@/actions/restaurant";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

interface RestaurantItemProps {
    userId?: string;
    restaurant: Restaurant;
    className?: string;
    userFavoritesRestaurants: UserFavoriteRestaurant[];
};


const RestaurantItem = ({ restaurant, className, userId, userFavoritesRestaurants }: RestaurantItemProps) => {

    const { data } = useSession();

    const isFavorite = userFavoritesRestaurants.some(
        (fav) => fav.restaurantId === restaurant.id,
    );

    const handleFavoriteClick = async () => {
        if (!data?.user.id) return;
        try {
          await toggleFavoriteRestaurant(data?.user.id, restaurant.id);
          toast.success(
            isFavorite
              ? "Restaurante removido dos favoritos."
              : "Restaurante favoritado.",
          );
        } catch (error) {
          toast.error("Erro ao favoritar restaurante.");
        }
      };

    return (
        <div
            className={ cn("min-w-[266px] max-w-[266px]", className )} 
        >
            <div className="w-full space-y-3">
                <div className="w-full h-[136px] relative">
                    <Link href={`/restaurants/${restaurant.id}`}>
                        <Image
                            src={restaurant.imageUrl}
                            alt={restaurant.name}
                            fill
                            className="rounded-lg object-cover"
                        />
                    </Link>

                    <div className="absolute top-2 left-2 gap-[2px] flex items-center bg-primary py-[2px] px-2 rounded-full bg-white">
                        <StarIcon size={12} className="fill-yellow-500 text-yellow-500"/>
                        <span className="text-xs font-semibold">5.0</span>
                    </div>

                    {userId && (
                        <Button 
                            size="icon" 
                            className={`absolute right-2 top-2 h-7 w-7 rounded-full bg-gray-700 ${isFavorite && "bg-primary hover:bg-gray-700"}`}
                            onClick={handleFavoriteClick}
                        >
                            <HeartIcon size={16} className="text-white fill-white"/>
                        </Button>
                    )}

                </div>
                <div>
                    <h3 className="text-sm font-semibold">{restaurant.name}</h3>
                    <div className="flex gap-3">
                        <div className="flex items-center gap-1 ">
                            <BikeIcon className="text-primary" size={14}/>
                            <span className="text-xs text-muted-foreground">
                                { Number(restaurant.deliveryFee) === 0 
                                    ? "Entrega grátis" 
                                    : formatCurrency(Number(restaurant.deliveryFee))}
                            </span>
                        </div>

                        <div className="flex items-center gap-1 ">
                            <TimerIcon className="text-primary" size={14}/>
                            <span className="text-xs text-muted-foreground">
                                { restaurant.deliveryTimeMinutes } min
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default RestaurantItem;