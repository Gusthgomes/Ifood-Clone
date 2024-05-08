import ProductItem from "./ProductItem";
import { Prisma } from "@prisma/client";

interface ProductsListProps {
    //@ts-ignore
    product: Prisma.ProductGetPayload<{
        include: {
            restaurant: {
                select: {
                    name: true;
                },
            },
        },
    }>[]
}

const ProductList = ({product}: ProductsListProps) => {
    
    return ( 
        <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden gap-4 px-5">
            {product.map((product) => (
                <ProductItem key={product.id} product={product} />
            ))}
        </div>
    );
}
 
export default ProductList;