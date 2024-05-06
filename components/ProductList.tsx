import { db } from "@/lib/prisma";
import ProductItem from "./ProductItem";

const ProductList = async () => {
    const products = await db.products.findMany({
        where: {
            discountPercentage: {
                gt:0
            },
        },
    });
    return ( 
        <div>
            {products.map((product) => (
    <ProductItem key={product.id} product={product} />
))}
        </div>
    );
}
 
export default ProductList;