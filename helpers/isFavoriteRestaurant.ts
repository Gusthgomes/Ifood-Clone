import { UserFavoriteRestaurant } from "@prisma/client";

export const isFavoriteRestaurant = (restaurantId: string, userFavoritesRestaurants: UserFavoriteRestaurant[]) =>  userFavoritesRestaurants.some(
        (fav) => fav.restaurantId === restaurantId,
    );
