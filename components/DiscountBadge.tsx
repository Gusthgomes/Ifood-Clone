import { Products } from "@prisma/client";
import { ArrowDownIcon } from "lucide-react";

interface DiscountBadgeProps {
    products: Pick<Products, "discountPercentage">;
};

const DiscountBadge = ({ products }: DiscountBadgeProps) => {
    return ( 
        <div className="gap-[2px] flex items-center bg-primary py-[2px] px-2 rounded-full text-white">
            <ArrowDownIcon size={12} className="font-semibold"/>
            <span className="font-semibold text-xs">{products.discountPercentage}%</span>
        </div>
     );
}
 
export default DiscountBadge;