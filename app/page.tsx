import CategoryList from "@/components/CategoryList";
import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import Search from "@/components/Search";
import { Button } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import Image from "next/image";


export default function Home() {
  return (
    <>
      <Header/>
      <div className="px-6 pt-6">
        <Search/>
      </div>

      <div className="px-6 pt-6">
        <CategoryList/>
      </div>

      <div className="px-5 pt-6">
        <Image 
          src="/promo-banner-01.png" 
          alt="Até 30% de desconto em todas as pizzas"
          height={0}
          width={0}
          className="w-full h-auto object-contain"
          sizes="100vw"
          quality={100}
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
        <ProductList/>
      </div>

      
    </>
  );
}
