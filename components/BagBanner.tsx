"use client";

import { CartContext } from "@/context/cart";
import { Restaurant } from "@prisma/client";
import { useContext } from "react";

interface BagBannerProps {
    restaurant: Pick<Restaurant, "id">
};

const BagBanner = ({ restaurant }: BagBannerProps) => {
    const { products } = useContext(CartContext);

    const restaurantHasProductsOnBag = products.filter(
        (product) => product.restaurantId === restaurant.id
    );

    return ( 
        <div className="px-5"></div>
    );
}

export default BagBanner;