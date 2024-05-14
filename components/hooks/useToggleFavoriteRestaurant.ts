import { toggleFavoriteRestaurant } from "@/actions/restaurant";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface UseToggleFavoriteRestaurantProps {
    userId?: string;
    restaurantId: string;
    restaurantIsCurrentlyFavorite?: boolean;

};

const UseToggleFavoriteRestaurant = ({userId, restaurantId, restaurantIsCurrentlyFavorite}: UseToggleFavoriteRestaurantProps) => {

  const router = useRouter();  
  const handleFavoriteClick = async () => {
        if (!userId) return;
        try {
          await toggleFavoriteRestaurant(userId, restaurantId);
            toast(
              restaurantIsCurrentlyFavorite
                ? "Restaurante removido dos favoritos."
                : "Restaurante favoritado.",
              {
                action: {
                  label: "Ver Favoritos",
                  onClick: () => router.push("/myFavoriteRestaurant"),
                },
              },
            );
        } catch (error) {
          toast.error("Erro ao favoritar restaurante.");
        }
      };
    return { handleFavoriteClick };
}
 
export default UseToggleFavoriteRestaurant;