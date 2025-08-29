import { SearchState } from "@/pages/SearchPage";
import { Restaurant, RestaurantSearchResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetRestaurant = (restaurantId?: string) => {
    const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
        const response = await fetch(
            `${API_BASE_URL}/api/restaurant/${restaurantId}`
        );

        if (!response.ok) {
            throw new Error("Failed to get Resataurant");
        }

        return response.json();
    };

    const {
        data: restaurant,
        isPending
    } = useQuery({
        queryKey: ["fetchRestaurant"],
        queryFn: getRestaurantByIdRequest,
        enabled:!!restaurantId,
    });

    return {
        restaurant,
        isPending,
    };
};

export const useSearchRestaurants = (searchState: SearchState, city?: string) => {

    const params = new URLSearchParams();
    params.set("searchQuery", searchState.searchQuery);
    params.set("page", searchState.page.toString());
    params.set("selectedCuisines", searchState.selectedCuisines.join(","));
    params.set("sortOption", searchState.sortOption)

    const createsearchRequest = async (): Promise<RestaurantSearchResponse> => {
        const response = await fetch(
            `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
        );

        if (!response.ok) {
            throw new Error("Failed to get restaurants");
        }

        return response.json();

    };

    const {
        data: results,
        isPending
    } = useQuery({
        queryKey: ["searchRestaurants", searchState],
        queryFn: createsearchRequest,
        enabled: !!city,
    });


    return {
        results,
        isPending,
    }

}