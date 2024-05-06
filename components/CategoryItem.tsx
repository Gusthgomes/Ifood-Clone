import { Category } from "@prisma/client";
import Image from "next/image";

interface CategoryItemProps {
    category: Category;
}

const CategoryItem = ( {category}: CategoryItemProps) => {
    return ( 
        <div className="flex items-center gap-3 py-3 px-6 bg-white shadow-md rounded-full">
            <Image 
                src={category.imageUrl} 
                alt={category.imageUrl} 
                width={30} 
                height={30}
            />
            <span 
            className="font-semibold text-sm"
            >
                {category.name}
            </span>
        </div>
     );
}
 
export default CategoryItem;