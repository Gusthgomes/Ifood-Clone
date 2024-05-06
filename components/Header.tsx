import Image from "next/image";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
    return ( 
        <div className="flex justify-between pt-6 px-5">
            <Image src="/logo.png" alt="Logo" width={100} height={30}/>
            <Button size="icon" variant="outline" className="border-none bg-transparent">
                <MenuIcon/>
            </Button>
        </div>
     );
}
 
export default Header;  