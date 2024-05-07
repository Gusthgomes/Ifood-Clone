import CategoryList from "@/components/CategoryList";
import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import PromoBanner from "@/components/PromoBanner";
import RestaurantList from "@/components/RestauranteList";
import Search from "@/components/Search";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/prisma";
import { ChevronRightIcon } from "lucide-react";


const Home = async () => {
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
  return (
    <>
      <Header/>
      <div className="px-6 pt-6">
        <Search/>
      </div>

      <div className="px-1 pt-6">
        <CategoryList/>
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-01.png" 
          alt="Até 30% de desconto em todas as pizzas"
        />
      </div>

      <div className="pt-6 space-y-4">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">
            Pedidos recomendados
          </h2>
          <Button 
            className="h-fit p-0 text-primary hover:bg-transparent" 
            variant="ghost"
          >
            Ver todos
            <ChevronRightIcon size={16}/>
          </Button>
        </div>
        <ProductList product={products}/>
      </div>

      <div className="px-5 pt-6">
        <PromoBanner
          src="/promo-banner-02.png" 
          alt="A partir de R$17,90 em lanches!"
        />
      </div>

      <div className="py-6 space-y-4">
        <div className="flex items-center justify-between px-5">
          <h2 className="font-semibold">
            Restaurantes recomendados
          </h2>
          <Button 
            className="h-fit p-0 text-primary hover:bg-transparent" 
            variant="ghost"
          >
            Ver todos
            <ChevronRightIcon size={16}/>
          </Button>
        </div>
        <RestaurantList />
      </div>
    </>
  );
}

export default Home;
