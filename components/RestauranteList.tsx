import { db } from "@/lib/prisma";
import RestaurantItem from "./RestaurantItem";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";
import { use } from "react";

const RestaurantList = async () => {

    const session = await getServerSession(authOption);
    // TODO: pegar restaurantes com maior número de pedidos
    
    const restaurants = await db.restaurant.findMany({ take: 10 });
    const userFavoritesRestaurants = await db.userFavoriteRestaurant.findMany({
        where: { userId: session?.user?.id},
    });

    return ( 
        <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
            {restaurants.map( (restaurant) => (
                <RestaurantItem 
                    key={restaurant.id} 
                    restaurant={restaurant} 
                    userId={session?.user?.id}
                    userFavoritesRestaurants={userFavoritesRestaurants}

                />
            ))}
        </div>
    );
}
 
export default RestaurantList;