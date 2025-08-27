import { SearchState } from "@/pages/SearchPage";
import { RestaurantSearchResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL=import.meta.env.VITE_API_BASE_URL;

export const useSearchRestaurants=(searchState:SearchState,city?:string)=>{

    const params=new URLSearchParams();
    params.set("searchQuery",searchState.searchQuery);

    const createsearchRequest=async():Promise<RestaurantSearchResponse>=>{
        const response=await fetch(
            `${API_BASE_URL}/api/restaurant/search/${city}?${params.toString()}`
        );

        if(!response.ok){
            throw new Error("Failed to get restaurants");
        }

        return response.json();

    };

    const {
        data:results,
        isPending
    }=useQuery({
        queryKey:["searchRestaurants",searchState],
        queryFn:createsearchRequest,
        enabled:!!city,
    });

    
    return{
        results,
        isPending,
    }

}