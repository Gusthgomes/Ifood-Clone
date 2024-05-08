import RestaurantImage from "@/components/RestaurantImage";
import { db } from "@/lib/prisma";
import { StarIcon } from "lucide-react";
import Image from "next/image";
import { notFound } from "next/navigation";

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
    });

    if (!restaurant) return notFound();

    return ( 
        <div>
            <RestaurantImage restaurants={ restaurant }/>

            <div className="flex justify-between items-center px-5 pt-5">
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
        </div>
    );
}

export default RestaurantPage;