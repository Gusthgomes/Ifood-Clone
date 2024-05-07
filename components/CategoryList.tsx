import { db } from "../lib/prisma";
import CategoryItem from "./CategoryItem";

const CategoryList = async () => {

    const categories = await db.category.findMany({});

    return ( 
        <div className="flex gap-4 overflow-x-scroll px-5 [&::-webkit-scrollbar]:hidden">
            {categories.map( (category) => (
                <CategoryItem key={category.id} category={category}/>
            ))}
        </div>
    );
}
 
export default CategoryList;