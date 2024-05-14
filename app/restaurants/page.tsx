import Restaurant from "@/components/Restaurant";
import { authOption } from "@/lib/auth";
import { db } from "@/lib/prisma";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Restaurantes",
    description: "Página de restaurantes",
};

const restaurantPage = async () => {
    const session = await getServerSession(authOption);
    const userFavoriteRestaurant = await db.userFavoriteRestaurant.findMany({
        where: {
            userId: session?.user?.id,
        },
        include: {
            restaurant: true,
        },
    });

    return (
    <Suspense>
        <Restaurant useFavoriteRestaurant={userFavoriteRestaurant}/>
    </Suspense>
    );
}

export default restaurantPage;