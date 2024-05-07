import { db } from "@/lib/prisma";
import ProductItem from "./ProductItem";

const ProductList = async () => {
    const products = await db.products.findMany({
        where: {
            discountPercentage: {
                gt:0
            },
        },
        take: 10,
        include: {
            restaurant: {
                select: {
                    name: true,
                },
            },
        },
    });

    console.log(products)
    return ( 
        <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-4 px-5">
            {products.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    );
}
 
export default ProductList;