import { Product } from "@prisma/client"; // Se o tipo correto for Product, ajuste aqui

interface ProductItemProps {
    product: Product; // Alterado para product em vez de products
}

const ProductItem = ({ product }: ProductItemProps) => {
    return (
        <div>{product.name}</div>
    );
}

export default ProductItem;
