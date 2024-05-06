import { db } from "../lib/prisma";
import CategoryItem from "./CategoryItem";

const CategoryList = async () => {

    const categories = await db.category.findMany({});

    // Pegar as categorias do bd
    // renderizar um item para cada categoria
    return ( 
        <div className="grid grid-cols-2 gap-3">
            {categories.map( (category) => (
                <CategoryItem key={category.id} category={category}/>
            ))}
        </div>
    );
}
 
export default CategoryList;