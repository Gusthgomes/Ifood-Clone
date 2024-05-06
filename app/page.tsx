import CategoryList from "@/components/CategoryList";
import Header from "@/components/Header";
import Search from "@/components/Search";


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
      
    </>
  );
}
