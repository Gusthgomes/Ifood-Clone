"use client";

import searchForRestaurants from "@/app/restaurants/actions/search";
import { Restaurant as food, UserFavoriteRestaurant } from "@prisma/client";
import { notFound, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react";
import Header from "./Header";
import RestaurantItem from "./RestaurantItem";

interface RestaurantProps {
    useFavoriteRestaurant: UserFavoriteRestaurant[];
};


const Restaurant = ({useFavoriteRestaurant}: RestaurantProps) => {

    const [restaurants, setRestaurants] = useState<food[]>([]);
    const searchParams = useSearchParams();
    const searchFor = searchParams.get("search");

    useEffect( () => {
        const featchRestaurants = async () => {
    
            if(!searchFor) {
                return;
            }

            const foundRestaurants = await searchForRestaurants(searchFor);
            setRestaurants(foundRestaurants);
        };

        featchRestaurants();

    }, [searchParams]);

    if (!searchFor) return notFound();

  return (
    <>
            <Header/>
            <div className="p-6 px-5">
            <h2 className="text-lg font-semibold mb-6">Restaurantes Encontrados</h2>
            <div className="flex w-full flex-col gap-6">
                { restaurants.map( (restaurant) => (
                    <RestaurantItem 
                        userFavoritesRestaurants={useFavoriteRestaurant}
                        key={restaurant.id} 
                        restaurant={ restaurant }
                        className="min-w-full max-w-full"
                    />
                ))}
            </div>
        </div>
        </>
  )
};

export default Restaurant