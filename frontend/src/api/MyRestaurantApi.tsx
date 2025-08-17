import { Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const useGetMyRestaurant = () => {

    const { getAccessTokenSilently } = useAuth0();

    const getRestaurantRequest = async (): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();
        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            }
        })
        if (!response.ok) {
            throw new Error("Failed to get restaurant");
        }

        return response.json();
    }

    const {
        data: restaurant,
        isPending,
    } = useQuery({
        queryKey: ["fetchMyRestaurant"],
        queryFn: getRestaurantRequest,
    })

    return {
        restaurant,
        isPending,
    };

}

export const useCreateMyRestaurant = () => {
    const { getAccessTokenSilently } = useAuth0();

    const createMyRestaurantRequest = async (restaurantFormData: FormData): Promise<Restaurant> => {
        const accessToken = await getAccessTokenSilently();

        const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
            body: restaurantFormData,
        });

        if (!response.ok) {
            throw new Error("Failed to create restaurant");
        }

        return response.json();

    }

    const {
        mutate: createRestaurant,
        isPending,
        isSuccess,
        error,
    } = useMutation({ mutationFn: createMyRestaurantRequest });

    if (isSuccess) {
        toast.success("Restaurant Created!");
    };

    if (error) {
        console.log(error)
        toast.error(`Unable to update restaurant!\n${error}`);
    };

    return {
        createRestaurant,
        isPending,
    };

};

