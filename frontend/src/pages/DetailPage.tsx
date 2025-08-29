import { useGetRestaurant } from "@/api/RestaurantApi";
import MenuItemCard from "@/components/MenuItemCard";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useParams } from "react-router-dom";

const DetailPage = () => {

    const { restaurantId } = useParams();
    const { isPending, restaurant } = useGetRestaurant(restaurantId);

    if (isPending || !restaurant) {
        return <div>Loading...</div>;
    }


    return (
        <div className="flex flex-col gap-10 mx-12 md:mx-20">
            <AspectRatio ratio={16 / 5}>
                <img
                    src={restaurant.imageUrl}
                    className="rounded-md object-cover h-full w-full"
                />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuItem) => (
                        <MenuItemCard menuItem={menuItem}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default DetailPage;
