import Header from "@/components/Header";
import ProductItem from "@/components/ProductItem";
import { db } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Pedidos recomendados",
    description: "Pedidos recomendados",
};

const RecommendedProductsPage = async () => {
    const products = await db.products.findMany({
        where: {
            discountPercentage: {
                gt:0
            },
        },
        take: 20,
        include: {
            restaurant: {
                select: {
                    name: true,
                },
            },
        },
    });

    if (!products) return notFound();

    return ( 
        <>
            <Header/>
            <div className="p-6 px-5">
                <h2 className="text-lg font-semibold mb-6">Pedidos recomendados</h2>
                <div className="grid grid-cols-2 gap-6">
                    { products.map( (products) => (
                        <ProductItem 
                        key={products.id} 
                        product={products}
                        className="min-w-full"
                    />
                    ))}
                </div>
            </div>
        </>  
    );
}

export default RecommendedProductsPage;