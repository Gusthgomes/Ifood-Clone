import Header from "@/components/Header";
import ProductItem from "@/components/ProductItem";
import { db } from "@/lib/prisma";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
    title: "Categorias",
    description: "Página de categorias",
};

interface CategoriesPageProps {
    params: {
        id: string;
    };
};

const CategoriesPage = async ({ params: { id } }: CategoriesPageProps) => {
    const category = await db.category.findUnique({
        where: {
            id,
        },
        include: {
            products: {
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

    if (!category) return notFound();

    return ( 
        <>
            <Header/>
            <div className="p-6 px-5">
                <h2 className="text-lg font-semibold mb-6">{ category.name }</h2>
                <div className="grid grid-cols-2 gap-6">
                    { category?.products.map( (products) => (
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
 
export default CategoriesPage;