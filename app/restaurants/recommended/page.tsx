import Header from "@/components/Header";
import RestaurantItem from "@/components/RestaurantItem";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

export const metadata: Metadata = {
    title: "Restaurantes recomendados",
    description: "Restaurantes recomendados",
};

const RecommendedPage = async () => {

    const session = await getServerSession(authOption);
    const userFavoriteRestaurant = await db.userFavoriteRestaurant.findMany({
        where: {
            userId: session?.user?.id,
        },
        include: {
            restaurant: true,
        },
    });

    const restaurants = await db.restaurant.findMany({});

    return ( 
        <>
            <Header/>
            <div className="p-6 px-5">
            <h2 className="text-lg font-semibold mb-6">Restaurantes recomendados</h2>
            <div className="flex w-full flex-col gap-6">
                { restaurants.map( (restaurant) => (
                    <RestaurantItem userFavoritesRestaurants={userFavoriteRestaurant}
                        key={restaurant.id} 
                        restaurant={ restaurant }
                        className="min-w-full max-w-full"
                    />
                ))}
            </div>
        </div>
        </>
    );
}

export default RecommendedPage;