import { formatCurrency } from "@/helpers/price";
import { Restaurant } from "@prisma/client"
import { BikeIcon, HeartIcon, StarIcon, TimerIcon } from "lucide-react";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface RestaurantItemProps {
    restaurant: Restaurant;
    className?: string;
};

const RestaurantItem = ({ restaurant, className }: RestaurantItemProps) => {
    return (
        <Link 
            className={ cn("min-w-[266px] max-w-[266px]", className )}
            href={`/restaurants/${restaurant.id}`}
        >
            <div className="w-full space-y-3">
                <div className="w-full h-[136px] relative">
                    <Image
                        src={restaurant.imageUrl}
                        alt={restaurant.name}
                        fill
                        className="rounded-lg object-cover"
                    />

                    <div className="absolute top-2 left-2 gap-[2px] flex items-center bg-primary py-[2px] px-2 rounded-full bg-white">
                        <StarIcon size={12} className="fill-yellow-500 text-yellow-500"/>
                        <span className="text-xs font-semibold">5.0</span>
                    </div>

                    <Button size="icon" className="absolute top-2 right-2 bg-muted-foreground rounded-full">
                        <HeartIcon size={16} className="text-white fill-white"/>
                    </Button>
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
        </Link>
     );
}
 
export default RestaurantItem;