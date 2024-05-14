import Restaurant from "@/components/Restaurant";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Restaurantes",
    description: "Página de restaurantes",
};

const restaurantPage = () => {
    return (
    <Suspense>
        <Restaurant/>
    </Suspense>
    );
}

export default restaurantPage;