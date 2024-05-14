import DeliveryInfo from "@/components/DeliveryInfo";
import ProductList from "@/components/ProductList";
import RestaurantImage from "@/components/RestaurantImage";
import { db } from "@/lib/prisma";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import BagBanner from "@/components/BagBanner";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth";

export const metadata: Metadata = {
    title: "Detalhes do restaurante",
    description: "Detalhes dos restaurantes",
};

interface RestaurantPageProps {
    params: {
        id: string;
    };
};

const RestaurantPage = async ({ params: { id } }: RestaurantPageProps) => {

    const restaurant = await db.restaurant.findUnique({
        where: {
            id,
        },
        include: {
            categories: {
                orderBy: {
                    name: "desc"
                },
                include: {
                    products: {
                        where: {
                            restaurantId: id,
                        },
                        include: {
                            restaurant: {
                                select: {
                                    name: true,
                                },
                            },
                        },
                    },
                },
            },
            products: {
                take: 10,
                include: {
                    restaurant: {
                        select: {
                            name: true,
                        },
                    },
                },
            },
        },
    });

    if (!restaurant) return notFound();

    const session = await getServerSession(authOption);
    const userFavoriteRestaurant = await db.userFavoriteRestaurant.findMany({
        where: {
            userId: session?.user?.id,
        },
    });

    return ( 
        <div>
            <RestaurantImage restaurants={ restaurant } userFavoriteRestaurant={userFavoriteRestaurant}/>

            <div className="flex justify-between items-center px-5 pt-5 relative z-50 mt-[-1.5rem] rounded-tl-3xl rounded-tr-3xl bg-white py-5">
                {/* TITULO */}
                <div className="flex items-center gap-[0.375rem]">
                    <div className="relative h-8 w-8">
                        <Image
                            src={ restaurant.imageUrl}
                            alt={ restaurant.name}
                            fill
                            className="rounded-full object-cover"
                        />
                    </div>
                    <h1 className="text-xl font-semibold">{ restaurant.name }</h1>
                </div>

                <div className="gap-[3px] flex items-center py-[2px] px-2 rounded-full bg-foreground text-white">
                    <StarIcon size={12} className="fill-yellow-500 text-yellow-500"/>
                    <span className="text-xs font-semibold">5.0</span>
                </div>
            </div>

            <div className="px-5">
                <DeliveryInfo restaurant={ restaurant }/>
            </div>

            <div className="flex gap-4 px-5 mt-3 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
                { restaurant.categories.map(category => (
                    <div 
                        className="bg-[#F4F4F4] min-w-[167px] rounded-lg  text-center" 
                        key={category.id}
                    >
                        <span className="text-muted-foreground text-xs">{ category.name }</span>
                    </div>
                ))}
            </div>

            <div className="mt-6 space-y-4">
                <h2 className="px-5 font-semibold"> Mais Pedidos</h2>
                <ProductList product={ restaurant.products }/>
            </div>

            { restaurant.categories.map( (category) => (
                <div className="mt-6 space-y-4" key={ category.id }>
                <h2 className="px-5 font-semibold"> { category.name } </h2>
                <ProductList product={ category.products }/>
            </div>
            ))}

            <BagBanner restaurant={restaurant}/>
        </div>
    );
}

export default RestaurantPage;