import ProductImage from "@/components/ProductImage";
import ProductsDetails from "@/components/ProductsDetails";
import { db } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Detales",
    description: "Detales do produto",
};

interface ProductsPageProps {
    params: {
        id: string;
    };
};

const ProductsPage = async ({params: { id }}: ProductsPageProps) => {
    const products = await db.products.findUnique({
        where: {
            id,
        },
        include: {
            restaurant: true,
        },
    });

    const juices = await db.products.findMany({
        where: {
            category: {
                name: "Sucos"
            },
        },
        include: {
            restaurant: true,
        },
    });

    if (!products) {
        return notFound();
    };

    return ( 
        <div className="">
             {/* IMAGEM DO PRODUTO */}
                <ProductImage products={products}/>

             {/* TITULO E PREÇO */}
            <ProductsDetails products={ products } complementaryProducts={ juices }/>
        </div>
    );
}

export default ProductsPage;