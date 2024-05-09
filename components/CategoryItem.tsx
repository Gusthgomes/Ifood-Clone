import { Category } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

interface CategoryItemProps {
    category: Category;
}

const CategoryItem = ( {category}: CategoryItemProps) => {
    return ( 
        <Link href={`/categories/${category.id}/products`}>
            <div className="flex h-[50px] items-center gap-3 py-3 px-8 my-1 bg-white shadow-md rounded-full">
                <Image 
                    src={category.imageUrl} 
                    alt={category.imageUrl} 
                    width={30} 
                    height={30}
                />
                <span 
                className="font-semibold text-sm mr-3"
                >
                    {category.name}
                </span>
            </div>
        </Link>
    );
}

export default CategoryItem;