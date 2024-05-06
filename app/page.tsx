import CategoryList from "@/components/CategoryList";
import Header from "@/components/Header";
import Search from "@/components/Search";
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
    </>
  );
}
